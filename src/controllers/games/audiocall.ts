import { UserWordData, WordData } from '../../interfaces/interfaces';
import GameStatisticview from '../../views/components/games/gameStatisticSection/gameStatistic';
import getRandomIntInclusive from '../../utils/getRandomNumber';
import shuffle from '../../utils/shuffle';
import Game from './game';
import UserWords from '../../api/usersWords';
import currentUser from '../../models/currentUser';

export default class Audiocall extends Game {
    constructor() {
        super();
        this.gameType = 'audiocall';
    }

    currentQuestion = 0;

    currentOptions: Array<number> = [];

    answersKeyboardKeys: Array<string> = [];

    controlKeyboardKeys: '' | ' ' | 'Enter' = '';

    userWordAPI = new UserWords();

    learnedWords: UserWordData[] | undefined;

    componentsToggler() {
        const SKIP_BTN = <HTMLDivElement>document.querySelector('.btn-skip');
        const NEXT_BTN = <HTMLDivElement>document.querySelector('.btn-next');
        const PLAYER = <HTMLElement>document.querySelector('.sound_wrapper');
        const ANSWER_CARD = <HTMLElement>document.querySelector('.answer-card');

        SKIP_BTN.classList.toggle('hidden');
        PLAYER.classList.toggle('hidden');
        NEXT_BTN.classList.toggle('hidden');
        ANSWER_CARD.classList.toggle('hidden');
    }

    optionsBtnsReset() {
        const answerBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answer');
        answerBtns.forEach((btn) => {
            const currentBtn = btn;
            currentBtn.disabled = false;
            currentBtn.classList.remove('wrong');
            currentBtn.classList.remove('right');
        });
    }

    skip() {
        const answerBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answer');
        const progressRange = <HTMLDivElement>document.querySelector('.game__progress-range');

        this.componentsToggler();
        answerBtns.forEach((btn) => {
            const currentBtn = btn;
            currentBtn.disabled = true;
        });
        const index = this.currentOptions.indexOf(this.currentQuestion);
        answerBtns[index].classList.add('right');
        this.wrongAnswers.push(this.currentQuestion);
        progressRange.children[this.currentQuestion].classList.add('wrong');
    }

    next() {
        if (this.currentQuestion !== 19) {
            this.currentQuestion += 1;
            this.changeContent();
            this.componentsToggler();
        } else {
            const results = new GameStatisticview(<WordData[]>this.words, this.rightAnswers, this.wrongAnswers);
            results.render();
            this.statisticGamePageListners();
            this.controlKeyboardKeys = '';
        }
    }

    getAnswerOptions() {
        let options: Array<number> = [this.currentQuestion];

        while (options.length < 5) {
            const index = getRandomIntInclusive(0, 19);
            if (!options.includes(index)) {
                options.push(index);
            }
        }

        options = <Array<number>>shuffle(options);
        this.currentOptions = options;
        const answerBtns: NodeListOf<HTMLDivElement> = document.querySelectorAll('.answer');

        answerBtns.forEach((option, i) => {
            const currentOption = option;
            currentOption.textContent = `${i + 1}. ${(<WordData[]>this.words)[options[i]].wordTranslate}`;
            currentOption.onclick = (e) =>
                this.answerHandler(e, (<WordData[]>this.words)[this.currentQuestion], options);
        });
    }

    getAudiofiles() {
        const wordAudioPlayer = <HTMLElement>document.querySelector('.sound_wrapper');
        const exampleAudioPlayer = <HTMLElement>document.querySelector('.answer_sound');

        const answer = (<WordData[]>this.words)[this.currentQuestion];

        const wordAudio = new Audio(`${this.baseURL}/${answer.audio}`);
        wordAudio.autoplay = true;
        const meaningAudio = new Audio(`${this.baseURL}/${answer.audioMeaning}`);
        const exampleAudio = new Audio(`${this.baseURL}/${answer.audioExample}`);

        async function playAudio(audio: HTMLAudioElement) {
            await audio.play();
        }
        wordAudioPlayer.onclick = async () => playAudio(wordAudio);
        exampleAudioPlayer.onclick = async () => {
            await playAudio(meaningAudio);
            meaningAudio.onended = async () => playAudio(exampleAudio);
        };

        const NEXT_BTN = <HTMLDivElement>document.querySelector('.btn-next');
        NEXT_BTN.onclick = () => this.stopAudiofiles.apply(this, [wordAudio, meaningAudio, exampleAudio]);
    }

    stopAudiofiles(...Audiofiles: Array<HTMLAudioElement>) {
        Audiofiles.forEach((file) => file.pause());
    }

    changeContent() {
        this.optionsBtnsReset();

        const answer = (<WordData[]>this.words)[this.currentQuestion];

        const cardImg = <HTMLImageElement>document.querySelector('.card_img');
        cardImg.src = `${this.baseURL}/${answer.image}`;

        const answerTranscription = <HTMLDivElement>document.querySelector('.answer_transcription');
        answerTranscription.textContent = `${answer.word} - ${answer.transcription} - ${answer.wordTranslate}`;
        const examplesContainer = <HTMLDivElement>document.querySelector('.answer_example');
        (<HTMLParagraphElement>(
            examplesContainer.firstElementChild
        )).innerHTML = `${answer.textMeaning} - ${answer.textMeaningTranslate}`;
        (<HTMLParagraphElement>(
            examplesContainer.lastElementChild
        )).innerHTML = `${answer.textExample} - ${answer.textExampleTranslate}`;

        this.getAnswerOptions();

        setTimeout(() => this.getAudiofiles(), 1000);
        this.answersKeyboardKeys = ['1', '2', '3', '4', '5'];
        this.controlKeyboardKeys = ' ';
        this.keyboardListner();
    }

    async answerHandler(e: Event, currectAnswer: WordData, options: number[], keyboardTarget?: HTMLButtonElement) {
        const progressRange = <HTMLDivElement>document.querySelector('.game__progress-range');
        const answerBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answer');
        let selectedAnswer: HTMLButtonElement;
        this.answersKeyboardKeys = [];

        if (keyboardTarget) {
            selectedAnswer = keyboardTarget;
        } else {
            selectedAnswer = <HTMLButtonElement>e.target;
        }
        answerBtns.forEach((btn) => {
            const currentBtn = btn;
            currentBtn.disabled = true;
        });

        if (
            (<string>selectedAnswer.textContent).slice((<string>selectedAnswer.textContent).indexOf('.') + 2) ===
            currectAnswer.wordTranslate
        ) {
            selectedAnswer.classList.add('right');
            this.rightAnswers.push(this.currentQuestion);
            progressRange.children[this.currentQuestion].classList.add('right');
        } else {
            selectedAnswer.classList.add('wrong');
            const index = options.indexOf(this.currentQuestion);
            answerBtns[index].classList.add('right');
            this.wrongAnswers.push(this.currentQuestion);
            progressRange.children[this.currentQuestion].classList.add('wrong');
        }

        this.componentsToggler();
        this.controlKeyboardKeys = 'Enter';
    }

    keyboardGameHandler(e: KeyboardEvent) {
        const answerBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answer');

        if (this.answersKeyboardKeys.includes(e.key)) {
            const keyboardTarget: HTMLButtonElement = answerBtns[+e.key - 1];
            this.answerHandler(e, (<WordData[]>this.words)[this.currentQuestion], this.currentOptions, keyboardTarget);
        }
        if (this.controlKeyboardKeys.includes(e.key)) {
            if (e.key === ' ') {
                this.skip();
                this.controlKeyboardKeys = 'Enter';
                this.answersKeyboardKeys = [];
            } else {
                this.controlKeyboardKeys = ' ';
                this.next();
            }
        }
    }

    async startGame() {
        await super.startGame();
        this.learnedWords = <UserWordData[]>(
            await this.userWordAPI.getAllUserWords(currentUser.userId, currentUser.token)
        );
        console.log(currentUser.userId);
        this.changeContent();
        this.nextBtnListner();
        this.skipBtnListner();
    }

    async updateStateWithResults() {
        super.updateStateWithResults();
        if (currentUser.userId) {
            const userWords = await this.userWordAPI.getAllUserWords(currentUser.userId, currentUser.token);
            let learned: UserWordData[];
            if (userWords) {
                learned = userWords?.filter((el) => el.difficulty === 'learned');
            }
            const difficultyLearned = { difficulty: 'learned' };
            this.rightAnswers.forEach(async (el) => {
                // if (!learned.find((a) => a.optional.id === (<WordData[]>this.words)[el].id)) {
                await this.userWordAPI.createUserWord(
                    currentUser.userId,
                    (<WordData[]>this.words)[el].id,
                    difficultyLearned,
                    currentUser.token
                );
                // }
            });
            const p = await this.userWordAPI.getAllUserWords(currentUser.userId, currentUser.token);
            console.log(p);
        }
    }

    nextBtnListner() {
        const NEXT_BTN = <HTMLDivElement>document.querySelector('.btn-next');
        NEXT_BTN.addEventListener('click', this.next.bind(this));
    }

    skipBtnListner() {
        const SKIP_BTN = <HTMLDivElement>document.querySelector('.btn-skip');
        SKIP_BTN.addEventListener('click', this.skip.bind(this));
    }

    keyboardListner() {
        document.onkeydown = (e) => this.keyboardGameHandler(e);
    }
}
