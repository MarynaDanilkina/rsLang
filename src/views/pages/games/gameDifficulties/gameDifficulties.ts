import { View } from '../../../../interfaces/interfaces';
import htmlElements from '../../../../models/htmlElements';
import Levels from '../../../components/dictionary/levels/levels';
import levelsMap from '../../../components/dictionary/levels/levelsMap';
import GameField from '../../../components/games/gameField/gameField';
import Header from '../../../components/header/header';

export default class gameDifficulties implements View {
    html = `<main id="main" class="game_difficulties_page"></main>`;

    render() {
        const btn = `<div class="btn-play">Играть</div>`;
        const header = new Header();
        const gameField = new GameField();

        header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
        gameField.render();

        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const difficulties = new Levels(levelsMap, GAME_CONTAINER);
        difficulties.render();
        GAME_CONTAINER.insertAdjacentHTML('beforeend', btn);
    }
}
