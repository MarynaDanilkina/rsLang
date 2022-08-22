import { View } from '../../../../interfaces/interfaces';

export default class GameDiscriptionSection implements View {
    html = `<main id="main"></main>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
