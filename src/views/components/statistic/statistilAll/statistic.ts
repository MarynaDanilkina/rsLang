import { View } from '../../../../interfaces/interfaces';
import './statistic.sass';

export default class StatisticAll implements View {
    html = `
          <div class="statistic">
            <div class="statistic_item">
              <div class="statistic_item__container">
                <p class="statistic__name">Спринт</p>
                <p class="statistic__info">
                  Изучено 0 слов
                </p>
                <p class="statistic__info">
                  Правильных ответов: 0%
                </p>
                <p class="statistic__info">
                  Самая длинная серия правильных ответов: 0
                </p>
              </div>
              <div class="statistic_item__container">
                <p class="statistic__name">Аудиовызов</p>
                <p class="statistic__info">
                  Изучено 0 слов
                </p>
                <p class="statistic__info">
                  Правильных ответов: 0%
                </p>
                <p class="statistic__info">
                  Самая длинная серия правильных ответов: 0
                </p>
              </div>
            </div>
        </div>
    </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
