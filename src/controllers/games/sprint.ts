import EventEmitter from 'events';
import { WordData } from '../../interfaces/interfaces';
import GameStatisticview from '../../views/components/games/gameStatisticSection/gameStatistic';
import getAnotherWord from '../helpers/getAnotherElement';
import getRandomIntInclusive from '../helpers/getRandomNumber';
import shuffle from '../helpers/shuffle';
import Game from './game';

export default class Sprint extends Game {
    eventEmitter: EventEmitter;

    currentQuestion: number;

    rightPairs: Array<[Pick<WordData, 'word' | 'id'> & { correct: boolean }, string]> | undefined;

    wrongPairs: Array<[Pick<WordData, 'word' | 'id'> & { correct: boolean }, string]> | undefined;

    allPairs: Array<[Pick<WordData, 'word' | 'id'> & { correct: boolean }, string]> | undefined;

    constructor() {
        super();
        this.gameType = 'sprint';
        this.eventEmitter = new EventEmitter();
        this.currentQuestion = 0;
    }

    startTimer() {
        const timerContainer = <HTMLDivElement>document.getElementById('timer');
        const emit = this.eventEmitter.emit.bind(this);
        let timeLeft = 60;

        setTimeout(function start() {
            if (timeLeft >= 0) {
                if (timeLeft > 45) timerContainer.classList.add('much-time');
                if (timeLeft < 45 && timeLeft > 15) {
                    timerContainer.classList.remove('much-time');
                    timerContainer.classList.add('middle-time');
                }
                if (timeLeft < 15) {
                    timerContainer.classList.remove('middle-time');
                    timerContainer.classList.add('little-time');
                }
                timerContainer.textContent = String(timeLeft);
                timeLeft -= 1;
                setTimeout(start, 1000);
            } else {
                emit('gameEnd');
            }
        }, 1000);
    }

    handleAnswer(answer: boolean) {
        if (answer === this.allPairs![this.currentQuestion][0].correct) {
            this.highlightQuestion(this.currentQuestion, true);
            this.currentQuestion += 1;
            return true;
        }
        this.highlightQuestion(this.currentQuestion, false);
        this.currentQuestion += 1;
        return false;
    }

    async handleAnswerView(isRight: boolean, buttonId: string) {
        const clickedButton = <HTMLButtonElement>document.getElementById(buttonId);
        if (isRight) {
            clickedButton.classList.add('right');
            await Promise.resolve(
                setTimeout(() => {
                    clickedButton.classList.remove('right');
                }, 200)
            );
            this.askQuestion();
        } else {
            clickedButton.classList.add('wrong');
            await Promise.resolve(
                setTimeout(() => {
                    clickedButton.classList.remove('wrong');
                }, 200)
            );
            this.askQuestion();
        }
    }

    handleAnswerClick() {
        const buttonRight = <HTMLButtonElement>document.getElementById('sprint-true');
        const buttonWrong = <HTMLButtonElement>document.getElementById('sprint-false');
        buttonRight.addEventListener('click', async () => {
            await this.handleAnswerView(this.handleAnswer(true), buttonRight.id);
        });
        buttonWrong.addEventListener('click', async () => {
            await this.handleAnswerView(this.handleAnswer(false), buttonWrong.id);
        });
    }

    highlightQuestion(index: number, isRight: boolean) {
        const progressPoints = document.querySelectorAll('.progress-point');
        const point = progressPoints[index];
        point.classList.add(isRight ? 'right' : 'wrong');
    }

    askQuestion() {
        const wordWrapper = <HTMLDivElement>document.querySelector('.word_wrapper');

        wordWrapper.textContent = `
        ${this.allPairs![this.currentQuestion][0].word} - ${this.allPairs![this.currentQuestion][1]}
        `;
    }

    createPairs() {
        this.rightPairs = this.words
            ?.slice(0, 10)
            .map((wordData) => [{ word: wordData.word, id: wordData.id, correct: true }, wordData.wordTranslate]);

        this.wrongPairs = this.words?.slice(10).map((wordData, index, arr) => {
            const otherWordData = getAnotherWord(arr, index);
            return [{ word: wordData.word, id: wordData.id, correct: false }, otherWordData.wordTranslate];
        });

        this.allPairs = shuffle([...this.rightPairs!, ...this.wrongPairs!]);
    }

    async startGame() {
        await super.startGame();
        this.startTimer();
        this.createPairs();
        this.askQuestion();
        this.handleAnswerClick();
    }
}
