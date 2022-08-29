import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import currentUser from '../../../models/currentUser';
import logout from '../../../controllers/pages/logoutController';
import './header.sass';

export default class Header implements View {
    loginIcon = '../../../assets/images/login_logo.png';

    logoutIcon = '../../../assets/images/logout.svg';

    html = `
      <header class="header">
        <div class="header__content_wrapper">
          <div class="header__logo_wrapper">
            <a href="#/">
              <img src="../../../assets/images/header_logo.png" class="header__logo" />
            </a>
          </div>
        <nav id="navigation" class="navigation">
          <div id="navItemMain" class="nav__item">
            <a href="#/" class="nav__link" data-link>Главная</a>
          </div>
          <div id="navItemTeam" class="nav__item">
            <a href="#/team/" class="nav__link" data-link>О команде</a>
          </div>
          <div id="navItemLogin" class="nav__item">
            <a href=${currentUser.name ? '#/' : '#/login/'} class="nav__link" data-link>
              <div class="login__logo">
                <img src=${currentUser.name ? this.logoutIcon : this.loginIcon} class="login__logo" />
              </div>
              <div class="login__title" id="login-title"></div>
            </a>
          </div>
          <div class="burger">
            <div class="bar"></div>
            <div class="bar middle_bar"></div>
            <div class="bar"></div>
          </div>
          <div id="hiddenMenu" class="hidden_nav opens">
            <div class="hidden_nav_items_wrapper">
                <div class="nav_item_active hidden_nav_item opens">
                  <a href="#/">Главная</a>
                  <div class="line line_active"></div>
                </div>
                <div class="hidden_nav_item opens">
                  <a href="#/book">Учебник</a>
                  <div class="line"></div>
                </div>
                <div class="hidden_nav_item opens">
                  <a href="#/games">Игры</a>
                  <div class="line"></div>
                </div>
                <div class="hidden_nav_item opens">
                  <a href="#/statistic">Статистика</a>
                  <div class="line"></div>
                </div>
                <div class="hidden_nav_item opens">
                  <a href="#/team">О команде</a>
                  <div class="line"></div>
                </div>
            </div>
          </div>
        </nav>
        </div>
      </header>
    `;

    render() {
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        const loginTitle = <HTMLDivElement>document.getElementById('login-title');
        const icon = <HTMLImageElement>document.querySelector('.login__logo');

        loginTitle.innerHTML = currentUser.name ? currentUser.name : 'Войти | Регистрация';

        if (currentUser.name) {
            icon.addEventListener('click', logout, { once: true });
        }
    }
}
