import { View } from '../../../../interfaces/interfaces';
import './levels.sass';

export default class Levels implements View {
    html = `<div class="levels__difficulty">
              <h2 class="levels__title">Выберите уровень сложности:</h2>
              <div class="levels__container">
                <button class="button__level">
                  <div class="name__level">
                    <h3>A1</h3>
                    <p>Elementary</p>
                  </div>
                  <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
                </button>
                <button class="button__level">
                  <div class="name__level">
                    <h3>A2</h3>
                    <p>Pre-Intermediate</p>
                  </div>
                  <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
                </button>
                <button class="button__level">
                  <div class="name__level">
                    <h3>B1</h3>
                    <p>Intermediate</p>
                  </div>
                  <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
                </button>
                <button class="button__level">
                  <div class="name__level">
                    <h3>B2</h3>
                    <p>Upper-Intermediate</p>
                  </div>
                  <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
                </button>
                <button class="button__level">
                  <div class="name__level">
                    <h3>C1</h3>
                    <p>Advanced</p>
                  </div>
                  <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
                </button>
                <button class="button__level">
                  <div class="name__level">
                    <h3>C2</h3>
                    <p>Proficiency</p>
                  </div>
                  <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
                </button>
              </div>
            </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
