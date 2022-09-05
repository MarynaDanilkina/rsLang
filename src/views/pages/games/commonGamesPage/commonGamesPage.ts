import { View } from '../../../../interfaces/interfaces';
import htmlConsts from '../../../../models/htmlElements';
import Footer from '../../../components/footer/footer';
import Header from '../../../components/header/header';
import Games from '../../../components/dictionary/games/games';

export default class СommonGamesPage implements View {
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.game = new Games();
    }

    header;

    footer;

    game;

    html = `<main id="main" class="games_page">
                <h3>Игры</h3>
            </main>`;

    render() {
        this.header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        this.game.render();
        this.footer.render();
    }
}
