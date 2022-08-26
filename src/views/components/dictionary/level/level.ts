import { LevelView } from '../../../../interfaces/interfaces';
import './level.sass';

export default class Level implements LevelView {
    constructor(type: [string, string]) {
        this.type = type;
        this.html = `
        <button class="${this.type[0]}" id="${this.type[0]}">
            <div class="${this.type[0]}">
              <h3 class="${this.type[0]}">${this.type[0]}</h3>
              <p class="${this.type[0]}">${this.type[1]}</p>
            </div>
            <img class="${this.type[0]}" src="../../../../assets/images/plus.png" alt="plus">
        </button>`;
    }

    type;

    html;

    render() {
        const MAIN = <HTMLElement>document.getElementById('levels__container');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
