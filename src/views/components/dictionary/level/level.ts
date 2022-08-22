import { LevelView, View } from '../../../../interfaces/interfaces';
import './level.sass';

export default class Level implements LevelView {
    constructor(type: [string, string]) {
        this.type = type;
        this.html = `
        <a href="#/book/">
        <button class="button__level">
            <div class="name__level">
              <h3>${this.type[0]}</h3>
              <p>${this.type[1]}</p>
            </div>
            <img class="button__add" src="../../../../assets/images/plus.png" alt="plus">
          </button>
        </div>
        </a>`;
    }

    type;

    html;

    render() {
        const MAIN = <HTMLElement>document.getElementById('levels__container');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
