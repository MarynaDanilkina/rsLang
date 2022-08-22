import { View } from '../../../../interfaces/interfaces';
import './informationSection.sass';

export default class InformationSection implements View {
    html = ` <section id="informationSection" class="information_section">
    <div class="information_section__content">
      <h2 class="information_section__title">
        Традиционные и новые эффективные подходы к изучению слов
      </h2>
      <div class="features_figures">
        <div class="features_figures_item">
          <p class="figure">3600</p>
          <p>Часто употребляемых английских слов</p>
        </div>
        <div class="features_figures_item">
          <p class="figure">2</p>
          <p>Мини игры</p>
        </div>
        <div class="features_figures_item">
          <p class="figure">6</p>
          <p>Разделов изучения</p>
        </div>
      </div>
      <div class="features">
        <div class="feature feature_1">
          <img class="feature_logo" src="../../../assets/images/book_logo.png" />
          <h3 class="feature_title">Электронный учебник</h3>
          <p class="feature_text">
            Вся коллекция разбита на шесть разделов, в каждом разделе 30
            страниц, на каждой странице 20 слов для изучения
          </p>
          <div class="feature_btn">
            <a href="#/book/" data-link>Подробнее ➜</a>
          </div>
        </div>
        <div class="feature feature_2">
          <a href="#/games/sprint/" data-link>
            <img class="feature_logo" src="../../../assets/images/game_1_logo.png" />
            <h3 class="feature_title">Мини-игра Спринт</h3>
          </a>
        </div>
        <div class="feature feature_3">
          <a href="#/games/audiocall/" data-link>
            <img class="feature_logo" src="../../../assets/images/game_2_logo.png" />
            <h3 class="feature_title">Мини-игра Аудиовызов</h3>
          </a>
        </div>
        <div class="feature feature_4">
          <a href="#/statistic/" data-link>
            <img class="feature_logo" src="../../../assets/images/stat_logo.png" />
            <h3 class="feature_title">Статистика</h3>
            <p class="feature_text">
              Отслеживай свой прогресс в индивидуальной статистике!
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
