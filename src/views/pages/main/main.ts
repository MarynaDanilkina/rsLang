import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import TitleSection from '../../components/mainContent/titleSection/titleSection';

export default class Main implements View {
    html = `<main id="main"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const tilteSection = new TitleSection();

        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        tilteSection.render();
        footer.render();
    }
}
