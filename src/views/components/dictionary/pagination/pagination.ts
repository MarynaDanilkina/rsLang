import { View } from '../../../../interfaces/interfaces';
import './pagination.sass';

export default class Pagination implements View {
    html = `<div class="pogination__container">
          <div class="pogination">
            <button class="pogination__button">&lt;&lt;</button>
            <button class="pogination__button">&lt;</button>
            <button class="pogination__button active">1</button>
            <button class="pogination__button">2</button>
            <button class="pogination__button">3</button>
            <button class="pogination__button">&gt;</button>
            <button class="pogination__button">&gt;&gt;</button>
          </div>
        </div>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
