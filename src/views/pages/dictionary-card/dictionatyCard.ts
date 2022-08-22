import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Level from '../../components/dictionary/level/level';
import Games from '../../components/dictionary/games/games';
import Card from '../../components/dictionary/card/card';
import Pagination from '../../components/dictionary/pagination/pagination';

export default class DictionaryCard implements View {
    html = `<main id="main"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const level = new Level();
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
