import { View } from '../../../../interfaces/interfaces';
import htmlElements from '../../../../models/htmlElements';
import GameField from '../../../components/games/gameField/gameField';
import GameStatisticview from '../../../components/games/gameStatisticSection/gameStatistic';
import Header from '../../../components/header/header';
import './gameStatistic.sass';

export default class GameStatisticPage implements View {
    html = `<main id="main" class="game_statistic_page"></main>`;

    render() {
        const header = new Header();
        const gameField = new GameField();
        const gameStatistic = new GameStatisticview();

        header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
        gameField.render();
        gameStatistic.render();
    }
}
