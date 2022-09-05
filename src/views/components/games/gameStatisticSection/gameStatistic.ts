import { GameStatistic, WordData } from '../../../../interfaces/interfaces';
import ResultsList from './resultsList/resultsList';
import '../../../pages/games/gameStatistic/gameStatistic.sass';

export default class GameStatisticview implements GameStatistic {
    constructor(gameWords: WordData[], rightAnswers: Array<number>, wrongAnswers: Array<number>) {
        this.gameWords = gameWords;
        this.rightAnswers = rightAnswers;
        this.wrongAnswers = wrongAnswers;
        this.resultsListRight = new ResultsList('right', gameWords, rightAnswers);
        this.resultsListWrong = new ResultsList('wrong', gameWords, wrongAnswers);
    }

    gameWords;

    rightAnswers;

    wrongAnswers;

    resultsListRight;

    resultsListWrong;

    html = `<div class="result_header">
                <h3>Результаты</h3>
                <p>Отличная игра, попробуй еще раз!</p>
            </div>
            <div class="game_results" id="gameResults"></div>
            <div class="btns_field">
                <div class="btn-exit">
                    <a href="#/" class="btns_field-link">Играть</a>
                </div>
                <div class="btn-restart">
                    <a href="#/games/" class="btns_field-link">Главная</a>
                </div>
            </div>`;

    render() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');

        GAME_CONTAINER.innerHTML = '';

        GAME_CONTAINER.insertAdjacentHTML('beforeend', this.html);
        this.resultsListRight.render();
        this.resultsListWrong.render();
    }
}
