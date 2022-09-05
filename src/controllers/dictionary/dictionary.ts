/* eslint-disable no-param-reassign */
import { UserWordData, WordData } from '../../interfaces/interfaces';
import currentUser from '../../models/currentUser';
import htmlElements from '../../models/htmlElements';
import '../../views/components/dictionary/card/card.sass';
import HiddenNavBlur from '../../views/components/hiddenNavBlur/hiddenNavBlur';
import DictionaryCard from '../../views/pages/dictionary-card/dictionatyCard';
import Dictionary from '../../views/pages/dictionary/dictionary';
import UserWords from '../../api/usersWords';
import Words from '../../api/words';
import DifficultWord from '../../views/pages/difficultWord/difficultWord';
import State from '../../models/state';

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
            if (
                event.classList.contains('A1') ||
                event.classList.contains('A2') ||
                event.classList.contains('B1') ||
                event.classList.contains('B2') ||
                event.classList.contains('C1') ||
                event.classList.contains('C2')
            ) {
                const level = event.classList.value;
                levelDictionary = mapper[level];
                const dictionaryCard = new DictionaryCard(levelDictionary, page);
                await dictionaryCard.render();
                await this.getWordsUser();
                this.learnedWordStyle();
            }
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

        close.addEventListener('click', () => {
            const book = new Dictionary();
            const hiddenNavBlur = new HiddenNavBlur();

            htmlElements.BODY.innerHTML = '';
            book.render();
            hiddenNavBlur.render();
            this.learnedWordStyle();
            this.styleCard();
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

                await userWords.deleteUserWord(currentUser.userId, buttonId, currentUser.token);
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
            // htmlElements.BODY.style.backgroundColor = '#e9ecfd';
            htmlElements.BODY.style.setProperty('background-color', '#e9ecfd', 'important');
            sprint.style.backgroundColor = '#e9ecfd';
            audiocall.style.backgroundColor = '#e9ecfd';
            audiocall.style.pointerEvents = 'none';
            sprint.style.pointerEvents = 'none';
            if (buttonPage) {
                buttonPage.style.backgroundColor = '#e9ecfd';
            }
        } else {
            // htmlElements.BODY.style.backgroundColor = '#ffffff';
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
        const main = <HTMLElement>document.querySelector('main');
        if (close) {
            if (close.className === 'A1') {
                main.style.setProperty('background', 'url(../../assets/backgrounds/levelA1.png), #ffffff', 'important');
                main.style.backgroundSize = '10%';
            } else if (close.className === 'A2') {
                main.style.setProperty('background', 'url(../../assets/backgrounds/levelA2.png), #ffffff', 'important');
                main.style.backgroundSize = '15%';
            } else if (close.className === 'B1') {
                main.style.setProperty('background', 'url(../../assets/backgrounds/levelB1.png), #ffffff', 'important');
                main.style.backgroundSize = '10%';
            } else if (close.className === 'B2') {
                main.style.setProperty('background', 'url(../../assets/backgrounds/levelB2.png), #ffffff', 'important');
                main.style.backgroundSize = '15%';
            } else if (close.className === 'C1') {
                main.style.setProperty('background', 'url(../../assets/backgrounds/levelC1.png), #ffffff', 'important');
                main.style.backgroundSize = '10%';
            } else if (close.className === 'C2') {
                main.style.setProperty('background', 'url(../../assets/backgrounds/levelC2.png), #ffffff', 'important');
                main.style.backgroundSize = '10%';
            }
        }
    }

    game() {
        const mapperLevel: Record<string, number> = {
            A1: 0,
            A2: 1,
            B1: 2,
            B2: 3,
            C1: 4,
            C2: 5,
        };
        const games = document.querySelectorAll('.dictionary_page .games_item__container');
        const userWords = new UserWords();
        State.selectedLevel = mapperLevel[levelDictionary[0]];
        games.forEach((game) =>
            game.addEventListener('click', async () => {
                const userCard = await userWords.getAllUserWords(currentUser.userId, currentUser.token);
                const learnedWords = userCard?.filter((obj) => obj.difficulty === 'learned');
                let wordsForGame: WordData[] = [];
                const nextPage = page;
                await this.update(nextPage, learnedWords, wordsForGame);
                if (wordsForGame.length > 20) {
                    wordsForGame = wordsForGame.slice(0, 20);
                    console.log(wordsForGame);
                }
                if (wordsForGame.length === 20) {
                    State.wordsForGame = wordsForGame;
                } else {
                    await this.update(nextPage, learnedWords, wordsForGame);
                }
            })
        );
    }

    async update(pageNew: number, learnedWords: UserWordData[] | undefined, wordsForGame: WordData[]) {
        const mapperLevel: Record<string, number> = {
            A1: 0,
            A2: 1,
            B1: 2,
            B2: 3,
            C1: 4,
            C2: 5,
        };
        const words = new Words();
        const cards: Array<WordData> = await words.getWords(mapperLevel[levelDictionary[0]], pageNew);
        cards.forEach((card) => {
            if (learnedWords) {
                let n = 0;
                for (let i = 0; i < learnedWords.length; i += 1) {
                    if (card.id === learnedWords[i].wordId) {
                        n += 1;
                        break;
                    }
                }
                if (n === 0) {
                    wordsForGame.push(card);
                }
            }
        });
        if (wordsForGame.length < 20) {
            if (pageNew === 0) {
                pageNew = 29;
            } else {
                pageNew -= 1;
            }
            await this.update(pageNew, learnedWords, wordsForGame);
        }
    }

    getNewWords() {
        const studied = document.querySelectorAll('.studied__card');

        if (currentUser.userId.length === 0) {
            studied.forEach((but) => {
                but.classList.add('notActive');
            });
        } else {
            studied.forEach((but) => {
                but.classList.remove('notActive');
            });
        }
    }
}
