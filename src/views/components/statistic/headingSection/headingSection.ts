import { View } from '../../../../interfaces/interfaces';
import './headingSection.sass';

export default class HeadingSection implements View {
    html = `<section id="statistic-heading" class="statistic-heading">
    <h2>Статистика</h2>
    <div class="results_figures">
      <div class="words-figure">
        <div class="figure">0</div>
        <p>Слов изучено</p>
      </div>
      <div class="answers-figure">
        <div class="figure">0%</div>
        <p>Правильных ответов</p>
      </div>
    </div>
  </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
