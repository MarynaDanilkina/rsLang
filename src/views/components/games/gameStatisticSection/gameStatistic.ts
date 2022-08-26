import { GameStatistic, WordData } from '../../../../interfaces/interfaces';
import ResultsList from './resultsList/resultsList';
import '../../../pages/games/gameStatistic/gameStatistic.sass';

export default class GameStatisticview implements GameStatistic {
    constructor(gameWords: WordData[], rightAnswers: Array<number>, wrongAnswers: Array<number>) {
        this.gameWords = gameWords;
        this.rightAnswers = rightAnswers;
        this.wrongAnswers = wrongAnswers;
    }

    gameWords;

    rightAnswers;

    wrongAnswers;

    html = `<div class="result_header">
                <div class="result_owl">
                    <img class="owl_logo result_owl_logo" src="../../../../assets/images/owl.png" />
                    <img class="resultspeech_logo" src="../../../../assets/images/speech.png" />
                    <div class="result_text">
                        <h3>Результаты</h3>
                        <p>Отличная игра, попробуй еще раз!</p>
                    </div>
                </div>
            </div>
            <div class="game_results" id="gameResults"></div>
            <div class="btns_field">
                <div class="btn-exit">
                    <a href="#/games/">Играть</a>
                </div>
                <div class="btn-restart">
                    <a href="#/games/">Главная</a>
                </div>
            </div>`;

    render() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const resultsListRight = new ResultsList('right', this.gameWords, this.rightAnswers);
        const resultsListWrong = new ResultsList('wrong', this.gameWords, this.wrongAnswers);

        GAME_CONTAINER.innerHTML = '';

        GAME_CONTAINER.insertAdjacentHTML('beforeend', this.html);
        resultsListRight.render();
        resultsListWrong.render();
    }
}
