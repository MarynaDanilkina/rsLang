import { LevelView, WordData } from '../../../interfaces/interfaces';
import Games from '../../components/dictionary/games/games';
import Card from '../../components/dictionary/card/card';
import Pagination from '../../components/dictionary/pagination/pagination';
import levelsMap from '../../components/dictionary/levels/levelsMap';
import Levels from '../../components/dictionary/levels/levels';
import Words from '../../../api/words';

export default class DictionaryCard {
    async render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.innerHTML = '';
        const level = new Levels([levelsMap[0]], MAIN);
        const game = new Games();
        const pagination = new Pagination();
        const words = new Words();
        const x: Array<WordData> = await words.getWords(0, 0);
        console.log(x);
        level.render();
        x.forEach((element) => {
            const card = new Card(element, 'https://rs-lang-kdz.herokuapp.com');
            card.render();
        });
        pagination.render();
        game.render();
    }
}
