import { GameStatisticItem, WordData } from '../../../../../../interfaces/interfaces';

export default class ResultsListItem implements GameStatisticItem {
    constructor(type: 'right' | 'wrong', word: WordData) {
        this.type = type;
        this.word = word;
        this.html = `<div class="${this.type}-item">
            <div class="answer_sound ${this.word.word}">
            <svg class="sound">
                <use xlink:href="#sound"></use>
            </svg>
            </div>
            <div>${this.word.word} - ${this.word.wordTranslate}</div>
        </div>`;
    }

    type;

    word;

    html;

    baseURL = 'https://rs-lang-kdz.herokuapp.com';

    addAudio() {
        const wordAudio = new Audio(`${this.baseURL}/${this.word.audio}`);
        const audioBtn = <HTMLDivElement>document.querySelector(`.${this.word.word}`);

        audioBtn.onclick = async () => wordAudio.play();
    }

    render() {
        const LIST = <HTMLElement>document.getElementById(`list-${this.type}`);

        LIST.insertAdjacentHTML('beforeend', this.html);
        this.addAudio();
    }
}
