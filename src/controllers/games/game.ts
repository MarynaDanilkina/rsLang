import Words from '../../api/words';
import { WordData } from '../../interfaces/interfaces';
import State from '../../models/state';
import Levels from '../../views/components/dictionary/levels/levels';
import levelsMap from '../../views/components/dictionary/levels/levelsMap';
import Audiocall from '../../views/pages/games/audiocall/audiocall';
import getRandomIntInclusive from '../helpers/getRandomNumber';
import shuffle from '../helpers/shuffle';

export default class Game {
    baseURL = 'https://rs-lang-kdz.herokuapp.com';

    gameLevel: number | undefined;

    words: WordData[] | undefined;

    gameType: 'audiocall' | 'sprint' | undefined;

    wrongAnswers: Array<number> = [];

    rightAnswers: Array<number> = [];

    rightAnswersSession = 0;

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
        GAME_CONTAINER.innerHTML = '';

        if (this.gameType === 'audiocall') {
            const game = new Audiocall();
            game.render();
            this.rightAnswersSession = State.games.audiocall.rightAnswersSession;
        }
        if (this.gameType === 'sprint') {
            // const game = new Sprint();
            // game.render()
            this.rightAnswersSession = State.games.sprint.rightAnswersSession;
        }
    }

    updateStateWithResults() {
        State.games[<'audiocall' | 'sprint'>this.gameType].learnedwords += 20;
        State.games[<'audiocall' | 'sprint'>this.gameType].rightAnswers += this.rightAnswers.length;
        State.games[<'audiocall' | 'sprint'>this.gameType].wrongAnswers += this.wrongAnswers.length;
        State.games[<'audiocall' | 'sprint'>this.gameType].rightAnswersSession += this.rightAnswersSession;
        console.log(State);
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

    statisticGamePageListners() {
        const EXIT_BTN = <HTMLDivElement>document.querySelector('.btn-exit');
        const RESTART_BTN = <HTMLDivElement>document.querySelector('.btn-restart');
        [EXIT_BTN, RESTART_BTN].forEach((btn) => {
            btn.addEventListener('click', this.updateStateWithResults.bind(this));
        });
    }
}
