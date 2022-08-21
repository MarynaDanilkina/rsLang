import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import GreetingSection from '../../components/mainContent/greetingSection/greetingSection';
import TitleSection from '../../components/mainContent/titleSection/titleSection';
import VideoSection from '../../components/mainContent/videoSection/videoSection';

export default class Main implements View {
    html = `<main id="main"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const tilteSection = new TitleSection();
        const greetingSection = new GreetingSection();
        const videoSection = new VideoSection();

        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        tilteSection.render();
        greetingSection.render();
        videoSection.render();
        footer.render();
    }
}
