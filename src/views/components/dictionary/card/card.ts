import { WordData } from '../../../../interfaces/interfaces';
import './card.sass';

export default class Card {
    constructor(element: WordData, link = 'https://rs-lang-kdz.herokuapp.com') {
        this.element = element;
        this.html = `<div class="card-wrapper">
                <div class="cards">
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
                      <button class="button__difficult card__button">Сложное слово</button>
                      <button class="button__delete card__button">Удалить</button>
                    </div>
                  </div>
                  <div class="card__count">
                    <svg class="sound">
                      <use xlink:href="#audioGame"></use>
                    </svg>
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
