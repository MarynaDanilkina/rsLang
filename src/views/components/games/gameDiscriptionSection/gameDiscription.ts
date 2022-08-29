import { GameDiscription } from '../../../../interfaces/interfaces';

export default class GameDiscriptionView implements GameDiscription {
    constructor(gameParams: [name: string, imgSrc: string, rules: string]) {
        this.gameParams = gameParams;
        this.html = `<div class="discription_wrapper" id="discription_wrapper">
                    <h2>${gameParams[0]}</h2>
                    <img class="game_logo" src="${gameParams[1]}" />
                    <div class="game_rules">
                    ${gameParams[2]}
                    </div>
                    <button class="btn-play">Далее</button>
                </div>`;
    }

    gameParams;

    html;

    render() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        // const levels = new Levels(levelsMap, GAME_CONTAINER);

        // levels.render();
        GAME_CONTAINER.insertAdjacentHTML('beforeend', this.html);
    }
}
