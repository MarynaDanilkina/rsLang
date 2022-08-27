import { WordData } from '../../../interfaces/interfaces';
import Games from '../../components/dictionary/games/games';
import Card from '../../components/dictionary/card/card';
import Pagination from '../../components/dictionary/pagination/pagination';
import Words from '../../../api/words';
import LevelDictionary from '../../components/dictionary/level/levelDictionary';
import DictionaryDevelopments from '../../../controllers/dictionary/dictionary';
import LevelDictionaryClose from '../../components/dictionary/level/levelDictionaryClose';

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

    constructor(levels: [string, string, string], page: number) {
        this.levels = levels;
        this.page = page;
    }

    async render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.innerHTML = '';
        console.log(this.levels);
        const level = new LevelDictionaryClose(this.levels);
        const game = new Games();
        const pagination = new Pagination(this.page);
        const words = new Words();
        const cards: Array<WordData> = await words.getWords(mapper[this.levels[0]], this.page);
        const dictionary = new DictionaryDevelopments();
        dictionary.setCards(cards);
        level.render();
        cards.forEach((element) => {
            const card = new Card(element, 'https://rs-lang-kdz.herokuapp.com');
            card.render();
        });
        pagination.render();
        game.render();
        dictionary.audio();
        dictionary.close();
    }
}
