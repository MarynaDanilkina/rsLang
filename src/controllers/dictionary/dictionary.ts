/* eslint-disable no-param-reassign */
import { WordData } from '../../interfaces/interfaces';
import currentUser from '../../models/currentUser';
import htmlElements from '../../models/htmlElements';
import '../../views/components/dictionary/card/card.sass';
import HiddenNavBlur from '../../views/components/hiddenNavBlur/hiddenNavBlur';
import DictionaryCard from '../../views/pages/dictionary-card/dictionatyCard';
import Dictionary from '../../views/pages/dictionary/dictionary';
import UserWords from '../../api/usersWords';
import Words from '../../api/words';
import UserArgWords from '../../api/usersAgrWords';
import DifficultWord from '../../views/pages/difficultWord/difficultWord';

let page = 0;
const link = 'https://rs-lang-kdz.herokuapp.com';

export const mapper: Record<string, [string, string, string]> = {
    A1: ['A1', 'Elementary', '0-600 слов'],
    A2: ['A2', 'Pre-Intermediate', '601-1200 слов'],
    B1: ['B1', 'Intermediate', '1201-1800 слов'],
    B2: ['B2', 'Upper-Intermediate', '1801-2400 слов'],
    C1: ['C1', 'Advanced', '2401-3000 слов'],
    C2: ['C2', 'Proficiency', '3001-3600 слов'],
};

let levelDictionary: [string, string, string];

export default class DictionaryDevelopments {
    cards!: WordData[];

    levels() {
        const container = <HTMLElement>document.getElementById('levels__container');

        container.addEventListener('click', async (e) => {
            const event = <HTMLElement>e.target;
            const level = event.classList.value;
            levelDictionary = mapper[level];
            const dictionaryCard = new DictionaryCard(levelDictionary, page);
            await dictionaryCard.render();
            await this.getWordsUser();
            this.learnedWordStyle();
        });
    }

    async getWordsUser() {
        const difficultCards = new UserWords();
        if (currentUser.userId) {
            const cards = await difficultCards.getAllUserWords(currentUser.userId, currentUser.token);
            if (cards) {
                cards.forEach((el) => {
                    const card = <HTMLElement>document.getElementById(`card-${el.wordId}`);
                    if (card && el.difficulty === 'hard') {
                        card.classList.add('activeDifficultCard');
                        const button = <HTMLElement>document.getElementById(`difficult-${el.wordId}`);
                        button.setAttribute('disabled', 'disabled');
                    }
                    if (card && el.difficulty === 'learned') {
                        card.classList.add('activeLearnedCard');
                        const button = <HTMLElement>document.getElementById(`learned-${el.wordId}`);
                        button.setAttribute('disabled', 'disabled');
                    }
                });
            }
        }
    }

    close() {
        const close = <HTMLElement>document.getElementById('close');

        close.addEventListener('click', (e) => {
            const book = new Dictionary();
            const hiddenNavBlur = new HiddenNavBlur();

            htmlElements.BODY.innerHTML = '';
            book.render();
            hiddenNavBlur.render();
            this.learnedWordStyle();
        });
    }

    next() {
        const next = <HTMLElement>document.getElementById('next');

        next.addEventListener('click', async () => {
            if (page < 29) {
                page += 1;
                const dictionaryCard = new DictionaryCard(levelDictionary, page);
                await dictionaryCard.render();
            }
            await this.pagination();
        });
    }

    back() {
        const back = <HTMLElement>document.getElementById('back');

        back.addEventListener('click', async () => {
            if (page > 0) {
                page -= 1;
                const dictionaryCard = new DictionaryCard(levelDictionary, page);
                await dictionaryCard.render();
            }
            await this.pagination();
        });
    }

    fullNext() {
        const fullNext = <HTMLElement>document.getElementById('full_next');

        fullNext.addEventListener('click', async () => {
            if (page < 29) {
                page = 29;
                const dictionaryCard = new DictionaryCard(levelDictionary, page);
                await dictionaryCard.render();
            }
            await this.pagination();
        });
    }

    fullBack() {
        const fullBack = <HTMLElement>document.getElementById('full_back');

        fullBack.addEventListener('click', async () => {
            if (page > 0) {
                page = 0;
                const dictionaryCard = new DictionaryCard(levelDictionary, page);
                await dictionaryCard.render();
            }
            await this.pagination();
        });
    }

    async pagination() {
        const next = <HTMLElement>document.getElementById('next');
        const fullNext = <HTMLElement>document.getElementById('full_next');
        const back = <HTMLElement>document.getElementById('back');
        const fullBack = <HTMLElement>document.getElementById('full_back');

        if (page === 29) {
            next.setAttribute('disabled', 'disabled');
            fullNext.setAttribute('disabled', 'disabled');
            back.removeAttribute('disabled');
            fullBack.removeAttribute('disabled');
        }
        if (page === 0) {
            back.setAttribute('disabled', 'disabled');
            fullBack.setAttribute('disabled', 'disabled');
            next.removeAttribute('disabled');
            fullNext.removeAttribute('disabled');
        }
        if (page > 0 && page < 29) {
            back.removeAttribute('disabled');
            fullBack.removeAttribute('disabled');
            next.removeAttribute('disabled');
            fullNext.removeAttribute('disabled');
        }
        await this.getWordsUser();
        this.learnedWordStyle();
    }

    audio() {
        const container = <HTMLElement>document.getElementById('main');
        const words = new Words();
        container.addEventListener('click', async (e) => {
            const event = <HTMLElement>e.target;
            if (event.classList.contains('sound')) {
                const svgId = event.id;
                const card = await words.getWord(svgId);
                const audio = document.querySelectorAll<HTMLAudioElement>(`.${card.word}`);
                audio[0].src = `${link}/${card.audio}`;
                audio[1].src = `${link}/${card.audioExample}`;
                audio[2].src = `${link}/${card.audioMeaning}`;

                await audio[0].play();
                for (let i = 0; i < audio.length - 1; i += 1) {
                    const audioId = audio[i];
                    audioId.addEventListener('ended', async () => {
                        if (audioId.duration === audioId.currentTime) {
                            await audio[i + 1].play();
                        }
                    });
                }
            }
        });
    }

    setCards(cards: WordData[]): void {
        this.cards = cards;
    }

    getCards(): WordData[] {
        return this.cards;
    }

    onlyAuthorized() {
        const button = document.querySelectorAll('.card-info__buttons');
        const levelDifficult = <HTMLElement>document.querySelector('.difficult button');

        if (currentUser.userId.length === 0) {
            button.forEach((but) => {
                but.classList.add('notActive');
            });
        } else {
            button.forEach((but) => {
                but.classList.remove('notActive');
            });
            if (levelDifficult) {
                levelDifficult.removeAttribute('disabled');
            }
        }
    }

    addDifficultWord() {
        const container = <HTMLElement>document.getElementById('main');
        container.addEventListener('click', async (e) => {
            const event = <HTMLElement>e.target;
            if (event.classList.contains('button__difficult')) {
                const buttonId = event.id.split('-')[1];
                const card = <HTMLElement>document.getElementById(`card-${buttonId}`);
                const learned = <HTMLElement>document.getElementById(`learned-${buttonId}`);
                const userWords = new UserWords();
                const currentWord = { difficulty: 'hard' };
                let ok = true;
                const getUserWords = await userWords.getAllUserWords(currentUser.userId, currentUser.token);
                getUserWords?.forEach(async (word) => {
                    if (word.wordId === buttonId && word.difficulty === 'learned') {
                        ok = false;
                        await userWords.updateUserWord(currentUser.userId, buttonId, currentWord, currentUser.token);
                        card.classList.remove('activeLearnedCard');
                        this.learnedWordStyle();
                    }
                });
                if (ok) {
                    await userWords.createUserWord(currentUser.userId, buttonId, currentWord, currentUser.token);
                    this.learnedWordStyle();
                }
                card.classList.add('activeDifficultCard');
                event.setAttribute('disabled', 'disabled');
                learned.removeAttribute('disabled');
            }
        });
    }

    difficultWord() {
        const button = <HTMLElement>document.querySelector('.difficult button');
        if (button) {
            button.addEventListener('click', async () => {
                const dictionaryCard = new DifficultWord();
                await dictionaryCard.render();
            });
        }
    }

    difficultDeleteWord() {
        const container = <HTMLElement>document.getElementById('main');
        container.addEventListener('click', async (e) => {
            const event = <HTMLElement>e.target;
            if (event.classList.contains('button-delete_difficult')) {
                const buttonId = event.id.split('-')[1];
                const userWords = new UserWords();
                const card = <HTMLElement>document.getElementById(`cardWrapper-${buttonId}`);

                await userWords.deleteUser(currentUser.userId, buttonId, currentUser.token);
                card.remove();
            }
        });
    }

    learnedWord() {
        const container = <HTMLElement>document.getElementById('main');
        container.addEventListener('click', async (e) => {
            const event = <HTMLElement>e.target;
            if (event.classList.contains('button__learned')) {
                const buttonId = event.id.split('-')[1];
                const card = <HTMLElement>document.getElementById(`card-${buttonId}`);
                const difficult = <HTMLElement>document.getElementById(`difficult-${buttonId}`);
                const userWords = new UserWords();
                const currentWord = { difficulty: 'learned' };
                const getUserWords = await userWords.getAllUserWords(currentUser.userId, currentUser.token);
                let ok = true;
                getUserWords?.forEach(async (word) => {
                    if (word.wordId === buttonId && word.difficulty === 'hard') {
                        ok = false;
                        await userWords.updateUserWord(currentUser.userId, buttonId, currentWord, currentUser.token);
                        card.classList.remove('activeDifficultCard');
                        this.learnedWordStyle();
                    }
                });
                if (ok) {
                    await userWords.createUserWord(currentUser.userId, buttonId, currentWord, currentUser.token);
                    this.learnedWordStyle();
                }
                card.classList.add('activeLearnedCard');
                event.setAttribute('disabled', 'disabled');
                difficult.removeAttribute('disabled');
            }
        });
    }

    learnedWordStyle() {
        const cards = document.querySelectorAll('.activeLearnedCard');
        const buttonPage = <HTMLElement>document.getElementById('button_page');
        const sprint = <HTMLElement>document.getElementById('game_sprint');
        const audiocall = <HTMLElement>document.getElementById('game_audiocall');
        if (cards.length === 20) {
            htmlElements.BODY.style.backgroundColor = '#e9ecfd';
            sprint.style.backgroundColor = '#e9ecfd';
            audiocall.style.backgroundColor = '#e9ecfd';
            audiocall.style.pointerEvents = 'none';
            sprint.style.pointerEvents = 'none';
            if (buttonPage) {
                buttonPage.style.backgroundColor = '#e9ecfd';
            }
        } else {
            htmlElements.BODY.style.backgroundColor = '#ffffff';
            sprint.style.backgroundColor = '#ffffff';
            audiocall.style.backgroundColor = '#ffffff';
            audiocall.style.pointerEvents = 'auto';
            sprint.style.pointerEvents = 'auto';
            if (buttonPage) {
                buttonPage.style.backgroundColor = '#ffffff';
            }
        }
    }

    styleCard() {
        const close = <HTMLElement>document.getElementById('close');
        const cards = document.querySelectorAll<HTMLElement>('.cards');
        if (close.className === 'A1') {
            cards.forEach((card) => {
                // card.style.backgroundColor = '#ececec';
            });
        }
    }
}
