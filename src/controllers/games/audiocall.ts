import { WordData } from '../../interfaces/interfaces';
import GameStatisticview from '../../views/components/games/gameStatisticSection/gameStatistic';
import getRandomIntInclusive from '../helpers/getRandomNumber';
import shuffle from '../helpers/shuffle';
import Game from './game';

export default class Audiocall extends Game {
    constructor() {
        super();
        this.gameType = 'Audiocall';
    }

    wrongAnswers: Array<number> = [];

    rightAnswers: Array<number> = [];

    currentQuestion = 0;

    currentOptions: Array<number> = [];

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
            currentOption.textContent = (<WordData[]>this.words)[options[i]].wordTranslate;
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
    }

    answerHandler(e: Event, currectAnswer: WordData, options: number[]) {
        const progressRange = <HTMLDivElement>document.querySelector('.game__progress-range');
        const answerBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answer');
        const selectedAnswer = <HTMLButtonElement>e.target;
        answerBtns.forEach((btn) => {
            const currentBtn = btn;
            currentBtn.disabled = true;
        });

        if (selectedAnswer.textContent === currectAnswer.wordTranslate) {
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
    }

    async startGame() {
        await super.startGame();
        this.changeContent();
        this.nextBtnListner();
        this.skipBtnListner();
    }

    nextBtnListner() {
        const NEXT_BTN = <HTMLDivElement>document.querySelector('.btn-next');
        NEXT_BTN.addEventListener('click', this.next.bind(this));
    }

    skipBtnListner() {
        const SKIP_BTN = <HTMLDivElement>document.querySelector('.btn-skip');
        SKIP_BTN.addEventListener('click', this.skip.bind(this));
    }
}
