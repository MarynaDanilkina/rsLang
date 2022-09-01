import { View } from '../../../interfaces/interfaces';
import './team.sass';

export default class Team implements View {
    html = `<div class="team-wrapper">
              <h3 class="team__header">Над проектом работали</h3>
              <div class="teams">
                <div class="team">
                  <div class="team__member">
                    <div class="team__img-bg">
                      <div id="Pavel" class="team__img"></div>
                    </div>
                    <p class="team__name">Pavel Kizhlo</p>
                    <p class="team__talent">Авторизация, игра 'Аудиовызов'</p>
                  </div>
                  <div class="team__member">
                    <div class="team__img-bg">
                      <div id="Maryna" class="team__img"></div>
                    </div>
                    <p class="team__name">Maryna Danilkina</p>
                    <p class="team__talent">Электронный учебник, словарь, карточка слова</p>
                  </div>
                  <div class="team__member">
                    <div class="team__img-bg">
                      <div id="Victoria" class="team__img"></div>
                    </div>
                    <p class="team__name">Victoria Zakharenkova</p>
                    <p class="team__talent">Главная страница, игра 'Спринт', статистика</p>
                  </div>
                </div>
              </div>
            </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
