import { View } from '../../../../interfaces/interfaces';
import State from '../../../../models/state';
import './statistic.sass';

export default class StatisticAll {
    constructor() {
        this.learnedWordsSprint = State.games.sprint.learnedwords;
        this.rightAnswersPercentSprint =
            Math.round((State.games.sprint.rightAnswers / State.games.sprint.learnedwords) * 100) | 0;
        this.rightAnswersSessionSprint = State.games.sprint.rightAnswersSession;
        this.learnedWordsAudioCall = State.games.audiocall.learnedwords;
        this.rightAnswersPercentAudiocall =
            Math.round((State.games.audiocall.rightAnswers / State.games.audiocall.learnedwords) * 100) | 0;
        this.rightAnswersSessionAudiocall = State.games.audiocall.rightAnswersSession;
        this.html = `
          <div class="statistic">
            <div class="statistic_item">
              <div class="statistic_item__container">
                <p class="statistic__name">Спринт</p>
                <p class="statistic__info">
                  Изучено ${this.learnedWordsSprint} слов
                </p>
                <p class="statistic__info">
                  Правильных ответов: ${this.rightAnswersPercentSprint}%
                </p>
                <p class="statistic__info">
                  Самая длинная серия правильных ответов: 0
                </p>
              </div>
              <div class="statistic_item__container">
                <p class="statistic__name">Аудиовызов</p>
                <p class="statistic__info">
                  Изучено ${this.learnedWordsAudioCall} слов
                </p>
                <p class="statistic__info">
                  Правильных ответов: ${this.rightAnswersPercentAudiocall}%
                </p>
                <p class="statistic__info">
                  Самая длинная серия правильных ответов: 0
                </p>
              </div>
            </div>
        </div>
    </div>`;
    }

    learnedWordsSprint;

    rightAnswersPercentSprint;

    rightAnswersSessionSprint;

    learnedWordsAudioCall;

    rightAnswersPercentAudiocall;

    rightAnswersSessionAudiocall;

    html;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
