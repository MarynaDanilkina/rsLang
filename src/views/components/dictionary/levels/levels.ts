import { View } from '../../../../interfaces/interfaces';
import Level from '../level/level';
import './levels.sass';
import levelsMap from './levelsMap';

export default class Levels implements View {
    html = `<div class="levels-wrapper" id="levels-wrapper">
                <div class="owl__img">
                    <div class="diagol">
                        <h3>Добро пожаловать в учебник!</h3>
                        <p>Для начало, выбери уровень уложности</p>
                    </div>
                    <img class="owl" src="../../../../assets/images/owl.png" alt="Owl">
                </div>
            </div>
            <div class="levels__difficulty">
                <h2 class="levels__title">Выберите уровень сложности:</h2>
                <div class="levels__container" id="levels__container">
                </div>
            </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
        levelsMap.forEach((level) => {
            const selectedlevel = new Level(level);
            selectedlevel.render();
        });
    }
}
