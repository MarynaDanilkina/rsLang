import { LevelView } from '../../../../interfaces/interfaces';
import './LevelDictionary.sass';

export default class LevelDictionary implements LevelView {
    constructor(type: [string, string, string]) {
        this.type = type;
        this.html = `
        <div class="button">
          <button class="${this.type[0]}" id="${this.type[0]}">
              <div class="${this.type[0]}">
                <h3 class="${this.type[0]}">${this.type[0]}</h3>
                <p class="${this.type[0]}">${this.type[1]}${this.type[2]}</p>
              </div>
              <img class="${this.type[0]}" src="../../../../assets/images/plus.png" alt="plus">
          </button>
        </div>
        `;
    }

    type;

    html;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
