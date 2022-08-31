import { View } from '../../../../interfaces/interfaces';
import './sprintView.sass';

export default class SprintView implements View {
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
              <div class="timer" id="timer"></div>
              <div class="word_wrapper"></div>
            <div class="sprint-answers_wrapper">
              <button class="sprint-answer" id="sprint-true">Верно</button>
              <button class="sprint-answer" id="sprint-false">Неверно</button>
            </div>
            <div class="btn-skip">Не знаю ➜</div>
            <div class="btn-next hidden">Далее ➜</div>`;

    render() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        GAME_CONTAINER.insertAdjacentHTML('beforeend', this.html);
    }
}
