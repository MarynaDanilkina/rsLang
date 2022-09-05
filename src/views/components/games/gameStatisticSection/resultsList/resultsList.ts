import { GameStatisticList, WordData } from '../../../../../interfaces/interfaces';
import ResultsListItem from './resultsListItem/resultsListItem';

export default class ResultsList implements GameStatisticList {
    constructor(type: 'right' | 'wrong', gameWords: WordData[], answers: Array<number>) {
        this.type = type;
        this.gameWords = gameWords;
        this.answers = answers;
        const amount = this.answers.length;
        let title: string;
        if (type === 'right') {
            title = `Известные слова - ${amount}:`;
        } else {
            title = `Неизвестные слова - ${amount}:`;
        }
        this.html = `<div class="${this.type}_answers" class="${this.type}Answers">
        <h3 class="title-${this.type}" id="title-${this.type}">${title}</h3>
        <div class="list-${this.type}" id="list-${this.type}"></div>
    </div>`;
    }

    type;

    gameWords;

    answers;

    html;

    render() {
        const RESULTS_FIELD = <HTMLElement>document.getElementById('gameResults');

        RESULTS_FIELD.insertAdjacentHTML('beforeend', this.html);
        this.answers.forEach((answer) => {
            const word = this.gameWords[answer];
            const listItem = new ResultsListItem(this.type, word);
            listItem.render();
        });
    }
}
