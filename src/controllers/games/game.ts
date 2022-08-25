import Levels from '../../views/components/dictionary/levels/levels';
import levelsMap from '../../views/components/dictionary/levels/levelsMap';

export class Game {
    renderLevels() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const levels = new Levels(levelsMap, GAME_CONTAINER);
        const playBtnHtml = '<div class="btn-play">Играть</div>';

        GAME_CONTAINER.innerHTML = '';
        levels.render();
        GAME_CONTAINER.insertAdjacentHTML('beforeend', playBtnHtml);
    }
    discriptionGamePageListners() {
        const PLAY_BTN = <HTMLDivElement>document.querySelector('.btn-play');
        PLAY_BTN.addEventListener('click', this.renderLevels);
    }
}
