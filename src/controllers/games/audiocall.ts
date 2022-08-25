import { WordData } from '../../interfaces/interfaces';
import getRandomIntInclusive from '../helpers/getRandomNumber';
import shuffle from '../helpers/shuffle';
import Game from './game';

export default class Audiocall extends Game {
    constructor() {
        super();
        this.gameType = 'Audiocall';
    }

    wrongAnswers: Array<string> = [];

    rightAnswers: Array<string> = [];

    currentQuestion = 0;

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

    skip() {
        this.componentsToggler();
    }

    next() {
        if (this.currentQuestion !== 19) {
            this.currentQuestion += 1;
            this.changeContent();
        }
        this.componentsToggler();
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
        const answerBtns = document.querySelectorAll('.answer');

        answerBtns.forEach((option, i) => {
            const currentOption = option;
            currentOption.textContent = (<WordData[]>this.words)[options[i]].wordTranslate;
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
        NEXT_BTN.addEventListener('click', () =>
            this.stopAudiofiles.apply(this, [wordAudio, meaningAudio, exampleAudio])
        );
    }

    stopAudiofiles(...Audiofiles: Array<HTMLAudioElement>) {
        Audiofiles.forEach((file) => file.pause());
    }

    changeContent() {
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
