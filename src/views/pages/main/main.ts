import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import GreetingSection from '../../components/mainContent/greetingSection/greetingSection';
import InformationSection from '../../components/mainContent/informationSection/informationSection';
import TitleSection from '../../components/mainContent/titleSection/titleSection';
import VideoSection from '../../components/mainContent/videoSection/videoSection';

export default class Main implements View {
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.titleSection = new TitleSection();
        this.greetingSection = new GreetingSection();
        this.videoSection = new VideoSection();
        this.informationSection = new InformationSection();
    }

    header;

    footer;

    titleSection;

    greetingSection;

    videoSection;

    informationSection;

    html = `<main id="main" class="main_page"></main>`;

    render() {
        this.header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        this.titleSection.render();
        this.greetingSection.render();
        this.videoSection.render();
        this.informationSection.render();
        this.footer.render();
    }
}
