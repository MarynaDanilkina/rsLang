import { View } from '../../../../interfaces/interfaces';
import './greetingSection.sass';

export default class GreetingSection implements View {
    html = `<section id="greetingSection" class="greeting_section">
    <div class="greeting_section__content">
      <div class="greeting_owl">
        <img class="owl_logo greeting_owl_logo" src="../../../assets/images/owl.png" />
        <img class="greeting_speech_logo" src="../../../assets/images/speech.png" />
        <div class="greeting_text">
          <p>Привет друг!</p>
          <p>
            Пора уже наконец выучить<br />
            язык, я тебе помогу в этом.
          </p>
          <p>Для кого это приложение?</p>
        </div>
      </div>
      <div class="basic_info">
        <div class="basic_info__users">
          <div class="user_kind">
            <img class="user_logo" src="../../../assets/images/children.png" />
            <div class="user_info">
              <p class="user_title">Дети</p>
              <p class="user_age">8 — 14 лет</p>
            </div>
          </div>
          <div class="user_kind">
            <img class="user_logo" src="../../../assets/images/teenagers.png" />
            <div class="user_info">
              <p class="user_title">Подростки</p>
              <p class="user_age">14 — 18 лет</p>
            </div>
          </div>
          <div class="user_kind">
            <img class="user_logo" src="../../../assets/images/adults.png" />
            <div class="user_info">
              <p class="user_title">Взрослые</p>
              <p class="user_age">18 — ∞</p>
            </div>
          </div>
        </div>
        <div class="basic_info__functionality">
          <div class="functionality_kind functionality_kind_book">
            <a href="#/book/">Учебник</a>
          </div>
          <div class="functionality_kind functionality_kind_statistic">
            <a href="#/statistic/">Статистика</a>
          </div>
          <div class="functionality_kind functionality_kind_team">
            <a href="#/team/">Команда</a>
          </div>
          <div class="functionality_kind functionality_kind_games">
            <a href="#/games/">Игры</a>
          </div>
          <div class="functionality_kind functionality_kind_login">
            <a href="#/login/">Войти</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
