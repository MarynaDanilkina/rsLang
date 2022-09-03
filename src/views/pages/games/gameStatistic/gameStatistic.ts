import { GameStatistic, WordData } from '../../../../interfaces/interfaces';
import htmlElements from '../../../../models/htmlElements';
import GameField from '../../../components/games/gameField/gameField';
import GameStatisticview from '../../../components/games/gameStatisticSection/gameStatistic';
import Header from '../../../components/header/header';
import './gameStatistic.sass';

export default class GameStatisticPage implements GameStatistic {
    constructor(gameWords: WordData[], rightAnswers: Array<number>, wrongAnswers: Array<number>) {
        this.gameWords = gameWords;
        this.rightAnswers = rightAnswers;
        this.wrongAnswers = wrongAnswers;
        this.header = new Header();
        this.gameField = new GameField();
        this.gameStatistic = new GameStatisticview(gameWords, rightAnswers, wrongAnswers);
    }

    header;

    gameField;

    gameStatistic;

    gameWords;

    rightAnswers;

    wrongAnswers;

    html = `<main id="main" class="game_statistic_page"></main>`;

    render() {
        htmlElements.BODY.innerHTML = '';

        this.header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
        this.gameField.render();
        this.gameStatistic.render();
    }
}
