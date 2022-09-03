import { GameDiscription } from '../../../../interfaces/interfaces';
import htmlElements from '../../../../models/htmlElements';
import GameDiscriptionView from '../../../components/games/gameDiscriptionSection/gameDiscription';
import GameField from '../../../components/games/gameField/gameField';
import Header from '../../../components/header/header';
import './gameDiscription.sass';

export default class GameDiscriptionPage implements GameDiscription {
    constructor(gameParams: [name: string, imgSrc: string, rules: string]) {
        this.gameParams = gameParams;
        this.header = new Header();
        this.gameField = new GameField();
        this.gameDiscription = new GameDiscriptionView(gameParams);
    }

    header;

    gameField;

    gameDiscription;

    gameParams;

    html = `<main id="main" class="game_discription_page"></main>`;

    render() {
        this.header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
        this.gameField.render();
        this.gameDiscription.render();
    }
}
