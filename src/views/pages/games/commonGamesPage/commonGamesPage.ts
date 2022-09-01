import { View } from '../../../../interfaces/interfaces';
import htmlConsts from '../../../../models/htmlElements';
import Footer from '../../../components/footer/footer';
import Header from '../../../components/header/header';
import Games from '../../../components/dictionary/games/games';

export default class СommonGamesPage implements View {
    html = `<main id="main" class="games_page">
                <h3>Игры</h3>
            </main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const game = new Games();

        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        game.render();
        footer.render();
    }
}
