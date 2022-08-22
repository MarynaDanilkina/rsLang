import { View } from '../../../../interfaces/interfaces';
import htmlElements from '../../../../models/htmlElements';
import Header from '../../../components/header/header';

export default class Audiocall implements View {
    html = `<main id="main"></main>`;

    render() {
        const header = new Header();

        header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
    }
}
