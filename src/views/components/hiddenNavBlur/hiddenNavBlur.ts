import { View } from '../../../interfaces/interfaces';
import htmlElements from '../../../models/htmlElements';
import './hiddenNavBlur.sass';

export default class HiddenNavBlur implements View {
    html = `<div class="dark-field"></div>`;

    render() {
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
    }
}
