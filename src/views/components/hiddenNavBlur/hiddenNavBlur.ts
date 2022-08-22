import { View } from '../../../interfaces/interfaces';
import htmlElements from '../../../models/htmlElements';
import './hiddenNavBlur.sass';

export default class HiddenNavBlur implements View {
    html = `<div clss="dark-field"></div>`;

    render() {
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
    }
}
