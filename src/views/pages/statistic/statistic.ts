import { View } from '../../../interfaces/interfaces';
import htmlElements from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import HeadingSection from '../../components/statistic/headingSection/headingSection';

export default class Statistic implements View {
    html = `<main id="main"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const headingSection = new HeadingSection();

        header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
        headingSection.render();
        footer.render();
    }
}
