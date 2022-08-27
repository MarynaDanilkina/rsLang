import { WordData } from '../../interfaces/interfaces';
import currentUser from '../../models/currentUser';
import htmlElements from '../../models/htmlElements';
import '../../views/components/dictionary/card/card.sass';
import HiddenNavBlur from '../../views/components/hiddenNavBlur/hiddenNavBlur';
import DictionaryCard from '../../views/pages/dictionary-card/dictionatyCard';
import Dictionary from '../../views/pages/dictionary/dictionary';

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
            console.log(event);
            const level = event.classList.value;
            console.log(level);
            levelDictionary = mapper[level];
            console.log(levelDictionary);
            console.log(page);
            const dictionaryCard = new DictionaryCard(levelDictionary, page);
            await dictionaryCard.render();
        });
    }

    close() {
        const close = <HTMLElement>document.getElementById('close');

        close.addEventListener('click', (e) => {
            console.log('+');
            const book = new Dictionary();
            const hiddenNavBlur = new HiddenNavBlur();

            htmlElements.BODY.innerHTML = '';
            book.render();
            hiddenNavBlur.render();
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
        });
    }

    pagination() {
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
    }

    audio() {
        const container = <HTMLElement>document.getElementById('main');
        const cards = this.getCards();
        container.addEventListener('click', async (e) => {
            const event = <HTMLElement>e.target;
            if (event.classList.contains('sound')) {
                const svgId = event.id;
                const card = cards.filter((el) => el.id === svgId);
                const audio = document.querySelectorAll<HTMLAudioElement>(`.${card[0].word}`);
                audio[0].src = `${link}/${card[0].audio}`;
                audio[1].src = `${link}/${card[0].audioExample}`;
                audio[2].src = `${link}/${card[0].audioMeaning}`;

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
        if (currentUser.userId.length === 0) {
            button.forEach((but) => {
                but.classList.add('notActive');
            });
        } else {
            button.forEach((but) => {
                but.classList.remove('notActive');
            });
        }
    }
}
