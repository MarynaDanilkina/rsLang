import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Levels from '../../components/dictionary/levels/levels';
import Games from '../../components/dictionary/games/games';

export default class Dictionary implements View {
    html = `<main id="main"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const levels = new Levels();
        const game = new Games();

        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        levels.render();
        game.render();
        footer.render();
    }
}
