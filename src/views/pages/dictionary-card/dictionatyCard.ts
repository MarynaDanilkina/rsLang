import { LevelView } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Games from '../../components/dictionary/games/games';
import Card from '../../components/dictionary/card/card';
import Pagination from '../../components/dictionary/pagination/pagination';
import levelsMap from '../../components/dictionary/levels/levelsMap';
import Levels from '../../components/dictionary/levels/levels';

export default class DictionaryCard implements LevelView {
    constructor(type: [string, string]) {
        this.type = type;
    }

    type;

    html = `<main id="main" class="dictionary_card"></main>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        const header = new Header();
        const footer = new Footer();
        const level = new Levels([levelsMap[0]], MAIN);
        const game = new Games();
        const card = new Card();
        const pagination = new Pagination();

        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        level.render();
        card.render();
        card.render();
        card.render();
        pagination.render();
        game.render();
        footer.render();
    }
}
