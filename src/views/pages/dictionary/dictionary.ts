import { GamesDictionaryView } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Levels from '../../components/dictionary/levels/levels';
import Games from '../../components/dictionary/games/games';
import './dictionary.sass';
import levelsMap from '../../components/dictionary/levels/levelsMap';

export default class Dictionary implements GamesDictionaryView {
    constructor(page: 'Игры' | 'Учебник') {
        this.page = page;
        this.html = `<main id="main">
                        <h2>${this.page}</h2>
                    </main>`;
    }

    page: 'Игры' | 'Учебник';

    html;

    render() {
        const header = new Header();
        const footer = new Footer();
        const levels = new Levels(levelsMap);
        const game = new Games();

        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        levels.render();
        game.render();
        footer.render();
    }
}
