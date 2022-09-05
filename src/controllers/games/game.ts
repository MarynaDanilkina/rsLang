import Words from '../../api/words';
import { optionalOfUserWord, StatisticsData, UserWordData, WordData } from '../../interfaces/interfaces';
import UserWords from '../../api/usersWords';
import currentUser from '../../models/currentUser';
import UserStat from '../../api/usersStat';
import State from '../../models/state';
import Levels from '../../views/components/dictionary/levels/levels';
import levelsMap from '../../views/components/dictionary/levels/levelsMap';
import AudiocallView from '../../views/pages/games/audiocall/audiocallView';
import SprintView from '../../views/pages/games/sprint/sprintView';
import getRandomIntInclusive from '../../utils/getRandomNumber';
import shuffle from '../../utils/shuffle';
import { showSpinner } from '../../utils/utils';

export default class Game {
    baseURL = 'https://rs-lang-kdz.herokuapp.com';

    userWordAPI = new UserWords();

    userStatsAPI = new UserStat();

    gameLevel: number | undefined;

    words: WordData[] | undefined;

    gameType: 'audiocall' | 'sprint' | undefined;

    wrongAnswers: Array<number> = [];

    rightAnswers: Array<number> = [];

    rightAnswersSession = 0;

    currentAnswersSession = 0;

    newLearnedCounter = 0;

    renderLevels() {
        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const levels = new Levels(levelsMap, GAME_CONTAINER);
        const playBtnHtml = '<button class="btn-play">Играть</button>';

        GAME_CONTAINER.innerHTML = '';
        levels.render();
        GAME_CONTAINER.insertAdjacentHTML('beforeend', playBtnHtml);

        const btn = <HTMLButtonElement>document.querySelector('.btn-play');
        btn.disabled = true;

        if (State.selectedLevel === -1 && State.wordsForGame.length > 0) {
            State.wordsForGame = [];
        }

        if (State.selectedLevel > -1) {
            const LEVELS_BTNS: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button__level');
            LEVELS_BTNS.forEach((b, index) => {
                if (State.selectedLevel !== index) {
                    const btnLevel = b;
                    btnLevel.disabled = true;
                }
            });
        }
        this.levelsGamePageListners();
        State.selectedLevel = -1;
    }

    selectLevel(e: Event) {
        const selectedBtn = <HTMLButtonElement>e.currentTarget;
        const LEVELS_BTNS: HTMLButtonElement[] = Array.from(document.querySelectorAll('.button__level'));
        const btn = <HTMLButtonElement>document.querySelector('.btn-play');

        LEVELS_BTNS.forEach((b) => {
            if (!b.disabled) {
                b.classList.remove('selected');
            }
        });
        if (!selectedBtn.disabled) {
            selectedBtn.classList.add('selected');
            this.gameLevel = LEVELS_BTNS.indexOf(selectedBtn);
            btn.disabled = false;
        }
    }

    async startGame() {
        showSpinner(true);

        const GAME_CONTAINER = <HTMLElement>document.getElementById('game__container');
        const wordsAPI = new Words();
        const pageNumber = getRandomIntInclusive(0, 29);

        if (State.wordsForGame.length > 0) {
            this.words = State.wordsForGame;
            State.wordsForGame = [];
        } else {
            this.words = await wordsAPI.getWords(<number>this.gameLevel, pageNumber);
            State.wordsForGame = [];
        }

        this.words = shuffle(this.words);
        GAME_CONTAINER.innerHTML = '';

        if (this.gameType === 'audiocall') {
            const game = new AudiocallView();
            game.render();
            this.rightAnswersSession = State.games.audiocall.rightAnswersSession;
        }
        if (this.gameType === 'sprint') {
            const game = new SprintView();
            game.render();
            this.rightAnswersSession = State.games.sprint.rightAnswersSession;
        }
    }

    async learnedWordsUpdate() {
        const allUserWord = await this.userWordAPI.getAllUserWords(currentUser.userId, currentUser.token);

        if (allUserWord) {
            const learnedWords = allUserWord?.filter((word) => word.difficulty === 'learned');
            const difficultWords = allUserWord?.filter((word) => word.difficulty === 'hard');
            const inProgresstWords = allUserWord?.filter((word) => word.difficulty === 'inProgress');

            for (let i = 0; i < this.rightAnswers.length; i++) {
                const wordIndex = this.rightAnswers[i];
                const word = (<WordData[]>this.words)[wordIndex];
                const wordInDifficult = <UserWordData>difficultWords?.find((w) => w.wordId === word.id) || undefined;

                const isDifficult = await this.wordPropsUpdate(wordInDifficult, 5, 'learned');
                if (isDifficult) {
                    continue;
                }

                const wordInProgress = <UserWordData>inProgresstWords?.find((w) => w.wordId === word.id) || undefined;
                const isInProgress = await this.wordPropsUpdate(wordInProgress, 3, 'learned');
                if (isInProgress) {
                    continue;
                }

                const wordInLearned = <UserWordData>learnedWords?.find((w) => w.wordId === word.id) || undefined;
                const isLearned = await this.wordPropsUpdate(wordInLearned, 3, 'learned');
                if (isLearned) {
                    continue;
                }

                const newUserWord: UserWordData = {
                    difficulty: 'inProgress',
                    optional: {
                        counter: 1,
                        wrongCounter: 0,
                        rightCounter: 1,
                    },
                };
                await this.userWordAPI.createUserWord(currentUser.userId, word.id, newUserWord, currentUser.token);
            }
            for (let i = 0; i < this.wrongAnswers.length; i++) {
                const wordIndex = this.wrongAnswers[i];
                const word = (<WordData[]>this.words)[wordIndex];

                const wordInLearned = <UserWordData>learnedWords?.find((w) => w.wordId === word.id) || undefined;

                const isLearned = await this.wordPropsUpdate(wordInLearned, 0, 'inProgress');
                if (isLearned) {
                    continue;
                }

                const wordInDifficult = <UserWordData>difficultWords?.find((w) => w.wordId === word.id) || undefined;
                const isDifficult = await this.wordPropsUpdate(wordInDifficult, 0, 'hard');
                if (isDifficult) {
                    continue;
                }

                const wordInProgress = <UserWordData>inProgresstWords?.find((w) => w.wordId === word.id) || undefined;

                if (wordInProgress) {
                    (<optionalOfUserWord>wordInProgress.optional).wrongCounter += 1;
                    const body: UserWordData = {
                        difficulty: wordInProgress.difficulty,
                        optional: wordInProgress.optional,
                    };
                    await this.userWordAPI.updateUserWord(
                        currentUser.userId,
                        <string>wordInProgress.wordId,
                        body,
                        currentUser.token
                    );
                    continue;
                }

                const newUserWord: UserWordData = {
                    difficulty: 'inProgress',
                    optional: {
                        counter: 0,
                        wrongCounter: 1,
                        rightCounter: 0,
                    },
                };
                await this.userWordAPI.createUserWord(currentUser.userId, word.id, newUserWord, currentUser.token);
            }
        }
    }

    async wordPropsUpdate(word: UserWordData, limit: number, group: string) {
        if (word) {
            switch (group) {
                case 'learned': {
                    if (<optionalOfUserWord>word.optional) {
                        (<optionalOfUserWord>word.optional).counter += 1;
                        (<optionalOfUserWord>word.optional).rightCounter += 1;
                        if ((<optionalOfUserWord>word.optional).counter >= limit) {
                            word.difficulty = group;
                            this.newLearnedCounter += 1;
                        }
                    } else {
                        word = {
                            difficulty: word.difficulty,
                            optional: {
                                counter: 1,
                                wrongCounter: 0,
                                rightCounter: 1,
                            },
                        };
                    }
                    break;
                }

                case 'inProgress': {
                    if (<optionalOfUserWord>word.optional) {
                        (<optionalOfUserWord>word.optional).wrongCounter += 1;
                        (<optionalOfUserWord>word.optional).counter = 0;
                    } else {
                        word = {
                            difficulty: word.difficulty,
                            optional: {
                                counter: 0,
                                wrongCounter: 1,
                                rightCounter: 0,
                            },
                        };
                    }

                    if ((<optionalOfUserWord>word.optional).counter >= limit) {
                        word.difficulty = group;
                    }
                    break;
                }

                case 'hard': {
                    if (<optionalOfUserWord>word.optional) {
                        (<optionalOfUserWord>word.optional).wrongCounter += 1;
                    } else {
                        word = {
                            difficulty: word.difficulty,
                            optional: {
                                counter: 0,
                                wrongCounter: 1,
                                rightCounter: 0,
                            },
                        };
                    }
                    break;
                }
            }
            const body: UserWordData = {
                difficulty: word.difficulty,
                optional: word.optional,
            };
            await this.userWordAPI.updateUserWord(currentUser.userId, <string>word.wordId, body, currentUser.token);
            return true;
        } else return false;
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
