import { GameStatistic } from '../../../../../../interfaces/interfaces';

export default class ResultsListItem implements GameStatistic {
    constructor(type: 'right' | 'wrong') {
        this.type = type;
        this.html = `<div class="${this.type}-item">
            <div class="answer_sound">
            <svg class="sound">
                <use xlink:href="#sound"></use>
            </svg>
            </div>
            <div>destroy - уничтожить</div>
        </div>`;
    }

    type;

    html;

    render() {
        const LIST = <HTMLElement>document.getElementById(`list-${this.type}`);
        LIST.insertAdjacentHTML('beforeend', this.html);
    }
}
