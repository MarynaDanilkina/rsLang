import { GameStatistic, View } from '../../../../interfaces/interfaces';
import ResultsList from './resultsList/resultsList';

export default class GameStatisticview implements View {
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
                <div class="btn-exit">Играть</div>
                <div class="btn-restart">Главная</div>
            </div>`;

    render() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const resultsListRight = new ResultsList('right');
        const resultsListWrong = new ResultsList('wrong');
        GAME_CONTAINER.insertAdjacentHTML('beforeend', this.html);
        resultsListRight.render();
        resultsListWrong.render();
    }
}
