import { View } from '../../../../interfaces/interfaces';
import State from '../../../../models/state';
import './headingSection.sass';

export default class HeadingSection {
    constructor() {
        this.learnedWords = State.games.sprint.learnedwords + State.games.audiocall.learnedwords;
        this.rightAnswersPercent =
            (<number>(
                Math.round(
                    ((State.games.sprint.rightAnswers + State.games.audiocall.rightAnswers) /
                        (State.games.sprint.learnedwords + State.games.audiocall.learnedwords)) *
                        100
                )
            )) | 0;
        this.html = `<section id="statistic-heading" class="statistic-heading">
        <h2>Статистика</h2>
        <div class="results_figures">
          <div class="words-figure">
            <div class="figure">${this.learnedWords}</div>
            <p>Слов изучено</p>
          </div>
          <div class="answers-figure">
            <div class="figure">${this.rightAnswersPercent}%</div>
            <p>Правильных ответов</p>
          </div>
        </div>
      </section>`;
    }

    learnedWords;

    rightAnswersPercent;

    html;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
        console.log(State);
    }
}
