import DictionaryDevelopments from '../../../../controllers/dictionary/dictionary';
import { View } from '../../../../interfaces/interfaces';
import './pagination.sass';

export default class Pagination implements View {
    page: number;

    html: string;

    constructor(page: number) {
        this.page = page;
        this.html = `<div class="pogination__container">
          <div class="pogination">
            <button class="pogination__button" id='full_back' disabled='disabled'>&lt;&lt;</button>
            <button class="pogination__button" id='back' disabled='disabled'>&lt;</button>
            <button class="pogination__button" id='button_page'>${page + 1}</button>
            <button class="pogination__button" id='next'>&gt;</button>
            <button class="pogination__button" id='full_next'>&gt;&gt;</button>
          </div>
        </div>`;
    }

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
        const dictionary = new DictionaryDevelopments();
        dictionary.next();
        dictionary.back();
        dictionary.fullNext();
        dictionary.fullBack();
        dictionary.pagination();
    }
}
