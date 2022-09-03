import { WordData } from '../../../interfaces/interfaces';
import Games from '../../components/dictionary/games/games';
import Card from '../../components/dictionary/card/card';
import Pagination from '../../components/dictionary/pagination/pagination';
import Words from '../../../api/words';
import DictionaryDevelopments from '../../../controllers/dictionary/dictionary';
import LevelDictionaryClose from '../../components/dictionary/level/levelDictionaryClose';
import { showSpinner } from '../../../utils/utils';

export const mapper: Record<string, number> = {
    A1: 0,
    A2: 1,
    B1: 2,
    B2: 3,
    C1: 4,
    C2: 5,
};

export default class DictionaryCard {
    levels: [string, string, string];

    page: number;

    level;

    game;

    pagination;

    words;

    dictionary;

    constructor(levels: [string, string, string], page: number) {
        this.levels = levels;
        this.page = page;
        this.level = new LevelDictionaryClose(levels);
        this.game = new Games();
        this.pagination = new Pagination(page);
        this.words = new Words();
        this.dictionary = new DictionaryDevelopments();
    }

    async render() {
        const MAIN = <HTMLElement>document.getElementById('main');

        MAIN.innerHTML =
            '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
        showSpinner(true);

        const cards: Array<WordData> = await this.words.getWords(mapper[this.levels[0]], this.page);

        this.dictionary.setCards(cards);
        this.level.render();
        cards.forEach((element) => {
            const card = new Card(element, 'https://rs-lang-kdz.herokuapp.com');
            card.render();
        });
        this.pagination.render();
        this.game.render();
        this.dictionary.audio();
        this.dictionary.close();
        this.dictionary.onlyAuthorized();
        this.dictionary.styleCard();
        this.dictionary.game();
        await this.dictionary.pagination();
    }
}
