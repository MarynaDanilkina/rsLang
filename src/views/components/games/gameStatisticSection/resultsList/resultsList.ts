import { GameStatistic } from '../../../../../interfaces/interfaces';
import ResultsListItem from './resultsListItem/resultsListItem';

export default class ResultsList implements GameStatistic {
    constructor(type: 'right' | 'wrong') {
        this.type = type;
        let amount: number;
        let title: string;
        if (type === 'right') {
            amount = 3; //здесь функция получения правильных ответов;
            title = `Известные слова - ${amount}:`;
        } else {
            amount = 10; //здесь функция получения неправильных ответов;
            title = `Неизвестные слова - ${amount}:`;
        }
        this.html = `<div class="${this.type}_answers" class="${this.type}Answers">
        <h3 class="title-${this.type}" id="title-${this.type}">${title}</h3>
        <div class="list-${this.type}" id="list-${this.type}"></div>
    </div>`;
    }

    type;

    html;

    render() {
        const RESULTS_FIELD = <HTMLElement>document.getElementById('gameResults');
        const listItem = new ResultsListItem(this.type);

        RESULTS_FIELD.insertAdjacentHTML('beforeend', this.html);
        listItem.render();
    }
}
