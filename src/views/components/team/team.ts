import { View } from '../../../interfaces/interfaces';
import './team.sass';

export default class Team implements View {
    html = `<div class="team-wrapper">
              <h3 class="team__header">Над проектом работали</h3>
              <div class="teams">
                <div class="team">
                  <a href="https://github.com/PavelKizhlo" target="_blank" class="team__member">
                    <div class="team__img-bg">
                      <div id="Pavel" class="team__img"></div>
                    </div>
                    <p class="team__name">Pavel Kizhlo</p>
                    <p class="team__talent">Авторизация, игра 'Спринт', Backend</p>
                  </a>
                  <a href="https://github.com/MarynaDanilkina" target="_blank" class="team__member">
                    <div class="team__img-bg">
                      <div id="Maryna" class="team__img"></div>
                    </div>
                    <p class="team__name">Maryna Danilkina</p>
                    <p class="team__talent">Электронный учебник, карточка слова, дизайн</p>
                  </a>
                  <a href="https://github.com/vzakharenkova" target="_blank" class="team__member">
                    <div class="team__img-bg">
                      <div id="Victoria" class="team__img"></div>
                    </div>
                    <p class="team__name">Victoria Zakharenkova</p>
                    <p class="team__talent">Главная страница, игра 'Аудиовызов', статистика</p>
                  </a>
                </div>
              </div>
            </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
