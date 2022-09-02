import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import currentUser from '../../../models/currentUser';
import logout from '../../../controllers/pages/logoutController';
import './header.sass';
import Theme from './theme';

export default class Header implements View {
    loginIcon = '../../../assets/images/login_logo.svg';

    logoutIcon = '../../../assets/images/logout.svg';

    html = `
      <header class="header">
        <div class="header__content_wrapper">
          <div class="header__logo_wrapper">
            <a href="#/">
              <img src="../../../assets/images/header_logo.png" class="header__logo" />
            </a>
          </div>
          <button class="header__icon header__moon">
          </button>
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
          <div id="hiddenMenu" class="hidden_nav">
            <div class="hidden_nav_items_wrapper">
                <a href="#/"  data-link class="hidden_nav_item">Главная</a>
                <a href="#/book/"  data-link class="hidden_nav_item">Учебник</a>
                <a href="#/games/"  data-link class="hidden_nav_item">Игры</a>
                <a href="#/statistic/"  data-link class="hidden_nav_item">Статистика</a>
                <a href="#/team/"  data-link class="hidden_nav_item">О команде</a>
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
        const theme = new Theme();
        theme.start();
    }
}
