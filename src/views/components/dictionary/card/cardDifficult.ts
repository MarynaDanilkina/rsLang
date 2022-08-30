import { WordData } from '../../../../interfaces/interfaces';
import './card.sass';

export default class CardDifficult {
    constructor(element: WordData, link = 'https://rs-lang-kdz.herokuapp.com') {
        this.element = element;
        this.html = `
        <div class="card-wrapper" id="cardWrapper-${element.id}">
                <div class="cards activeDifficultCard" id="card-${element.id}">
                  <img class="cards__img" src="${link}/${element.image}" alt="${element.image}">
                  <div class="card__info">
                    <p class="card-info__name">${element.word} - ${element.transcription} - ${element.wordTranslate}</p>
                    <p class="card-info__examples">
                      ${element.textExample} - ${element.textExampleTranslate}
                    </p>
                    <p class="card-info__examples">
                      ${element.textMeaning} - ${element.textMeaningTranslate}
                    </p>
                    <div class="card-info__buttons">
                      <button class="card__button button-delete_difficult" id="difficultDelete-${element.id}">Удалить из сложного</button>
                    </div>
                  </div>
                  <div class="card__count">
                    <svg class="sound" id="${element.id}">
                      <use xlink:href="#audioGame"></use>
                    </svg>
                    <div>
                      <audio src="" class="${element.word}"></audio>
                      <audio src="" class="${element.word}"></audio>
                      <audio src="" class="${element.word}"></audio>
                    </div>
                  </div>
                </div>
	        </div>`;
    }

    element;

    html;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
