import { View } from '../../../../interfaces/interfaces';
import './level.sass';

export default class Level implements View {
    html = `<div class="levels__difficulty">
        <div class="levels__container">
           <button class="button__level">
            <div class="name__level">
              <h3>A1</h3>
              <p>Elementary 0-600 слов</p>
            </div>
            <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
          </button>
        </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
