import { GameDiscription } from '../../../../interfaces/interfaces';
import htmlElements from '../../../../models/htmlElements';
import GameDiscriptionView from '../../../components/games/gameDiscriptionSection/gameDiscription';
import GameField from '../../../components/games/gameField/gameField';
import Header from '../../../components/header/header';
import './gameDiscription.sass';

export default class GameDiscriptionPage implements GameDiscription {
    constructor(gameParams: [name: string, imgSrc: string, rules: string]) {
        this.gameParams = gameParams;
    }

    gameParams;

    html = `<main id="main" class="game_discription_page"></main>`;

    render() {
        const header = new Header();
        const gameField = new GameField();
        const gameDiscription = new GameDiscriptionView(this.gameParams);

        header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
        gameField.render();
        gameDiscription.render();
    }
}
