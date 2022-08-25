import Words from '../../api/words';
import { WordData } from '../../interfaces/interfaces';
import Levels from '../../views/components/dictionary/levels/levels';
import levelsMap from '../../views/components/dictionary/levels/levelsMap';
import Audiocall from '../../views/pages/games/audiocall/audiocall';
import getRandomIntInclusive from '../helpers/getRandomNumber';
import shuffle from '../helpers/shuffle';

export default class Game {
    baseURL = 'https://rs-lang-kdz.herokuapp.com';

    gameLevel: number | undefined;

    words: WordData[] | undefined;

    gameType: 'Audiocall' | 'Sprint' | undefined;

    renderLevels() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const levels = new Levels(levelsMap, GAME_CONTAINER);
        const playBtnHtml = '<div class="btn-play">Играть</div>';

        GAME_CONTAINER.innerHTML = '';
        levels.render();
        GAME_CONTAINER.insertAdjacentHTML('beforeend', playBtnHtml);

        this.levelsGamePageListners();
    }

    selectLevel(e: Event) {
        const selectedBtn = <HTMLButtonElement>e.currentTarget;
        const LEVELS_BTNS = Array.from(document.querySelectorAll('.button__level'));

        LEVELS_BTNS.forEach((btn) => btn.classList.remove('selected'));
        selectedBtn.classList.add('selected');
        this.gameLevel = LEVELS_BTNS.indexOf(selectedBtn);
    }

    async startGame() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const wordsAPI = new Words();
        const pageNumber = getRandomIntInclusive(0, 29);

        this.words = await wordsAPI.getWords(<number>this.gameLevel, pageNumber);
        this.words = <WordData[]>shuffle(this.words);
        console.log(this.words.length);
        GAME_CONTAINER.innerHTML = '';

        if (this.gameType === 'Audiocall') {
            const game = new Audiocall();
            game.render();
        }
        if (this.gameType === 'Sprint') {
            // const game = new Sprint();
            // game.render()
        }
    }

    discriptionGamePageListners() {
        const PLAY_BTN = <HTMLDivElement>document.querySelector('.btn-play');

        PLAY_BTN.addEventListener('click', this.renderLevels.bind(this));
    }

    levelsGamePageListners() {
        const LEVELS_BTNS = document.querySelectorAll('.button__level');
        const PLAY_BTN = <HTMLDivElement>document.querySelector('.btn-play');

        LEVELS_BTNS.forEach((btn) => btn.addEventListener('click', (e: Event) => this.selectLevel(e)));

        PLAY_BTN.addEventListener('click', this.startGame.bind(this));
    }
}
