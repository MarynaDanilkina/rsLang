import { View } from '../../../interfaces/interfaces';
import './team.sass';

export default class Team implements View {
    html = `<div class="team-wrapper">
              <h3 class="team__header">Над проектом работали</h3>
              <div class="teams">
                <div class="team">
                  <div class="team__member">
                    <div class="team__img-bg">
                      <div class="team__img"></div>
                    </div>
                    <p class="team__name">Имя Фамилия</p>
                    <p class="team__talent">Что сделал</p>
                  </div>
                  <div class="team__member">
                    <div class="team__img-bg">
                      <div class="team__img"></div>
                    </div>
                    <p class="team__name">Имя Фамилия</p>
                    <p class="team__talent">Что сделал</p>
                  </div>
                  <div class="team__member">
                    <div class="team__img-bg">
                      <div class="team__img"></div>
                    </div>
                    <p class="team__name">Имя Фамилия</p>
                    <p class="team__talent">Что сделал</p>
                  </div>
                </div>
              </div>
            </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
