import { LevelsView } from '../../../../interfaces/interfaces';
import Level from '../level/level';
import './levels.sass';
import './gameLevels.sass';

export default class Levels implements LevelsView {
    constructor(levels: Array<[string, string, string]>, container: HTMLElement) {
        this.levels = levels;
        this.container = container;
    }

    html = `<div class="levels__difficulty">
                <h2 class="levels__title">Выберите уровень сложности:</h2>
                <div class="levels__container" id="levels__container"></div>
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>`;

    levels;

    container;

    render() {
        this.container.insertAdjacentHTML('beforeend', this.html);
        this.levels.forEach((level) => {
            const selectedlevel = new Level(level);
            selectedlevel.render();
        });
    }
}
