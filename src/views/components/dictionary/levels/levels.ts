import { LevelsView, View } from '../../../../interfaces/interfaces';
import Level from '../level/level';
import './levels.sass';
import levelsMap from './levelsMap';

export default class Levels implements LevelsView {
    constructor(levels: Array<[string, string]>) {
        this.levels = levels;
    }

    html = `<div class="levels__difficulty">
                <h2 class="levels__title">Выберите уровень сложности:</h2>
                <div class="levels__container" id="levels__container">
                </div>
            </div>`;

    levels;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
        this.levels.forEach((level) => {
            const selectedlevel = new Level(level);
            selectedlevel.render();
        });
    }
}
