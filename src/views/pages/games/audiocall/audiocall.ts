import { View } from '../../../../interfaces/interfaces';
import './audiocall.sass';

export default class Audiocall implements View {
    html = `<div class="game__progress-range">
                <div class="progress-point" id="progress_point_1"></div>
                <div class="progress-point" id="progress_point_2"></div>
                <div class="progress-point" id="progress_point_3"></div>
                <div class="progress-point" id="progress_point_4"></div>
                <div class="progress-point" id="progress_point_5"></div>
                <div class="progress-point" id="progress_point_6"></div>
                <div class="progress-point" id="progress_point_7"></div>
                <div class="progress-point" id="progress_point_8"></div>
                <div class="progress-point" id="progress_point_9"></div>
                <div class="progress-point" id="progress_point_10"></div>
                <div class="progress-point" id="progress_point_11"></div>
                <div class="progress-point" id="progress_point_12"></div>
                <div class="progress-point" id="progress_point_13"></div>
                <div class="progress-point" id="progress_point_14"></div>
                <div class="progress-point" id="progress_point_15"></div>
                <div class="progress-point" id="progress_point_16"></div>
                <div class="progress-point" id="progress_point_17"></div>
                <div class="progress-point" id="progress_point_18"></div>
                <div class="progress-point" id="progress_point_19"></div>
                <div class="progress-point" id="progress_point_20"></div>
            </div>
            <div class="sound_wrapper">
                <div class="games__audio">
                <svg class="sound">
                    <use xlink:href="#sound"></use>
                </svg>
                </div>
            </div>
            <div class="answer-card  hidden">
                <img class="card_img" src="" />
                <div class="card_text">
                    <div class="answer_transcription"></div>
                    <div class="answer_example">
                        <p></p>
                        <p></p>
                    </div>
                <div class="answer_sound">
                    <svg class="sound">
                    <use xlink:href="#sound"></use>
                    </svg>
                </div>
                </div>
            </div>
            <div class="answers_wrapper">
                <button class="answer answer_1">Ответ</button>
                <button class="answer answer_2">Ответ</button>
                <button class="answer answer_3">Ответ</button>
                <button class="answer answer_4">Ответ</button>
                <button class="answer answer_5">Ответ</button>
            </div>
            <div class="btn-skip">Не знаю ➜</div>
            <div class="btn-next hidden">Далее ➜</div>`;

    render() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        GAME_CONTAINER.insertAdjacentHTML('beforeend', this.html);
    }
}
