import { View } from '../../../interfaces/interfaces';
import htmlElements from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import HeadingSection from '../../components/statistic/headingSection/headingSection';
import StatisticAll from '../../components/statistic/statistilAll/statistic';

export default class Statistic implements View {
    html = `<main id="main" class="statistic_page"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const headingSection = new HeadingSection();
        const statisticAll = new StatisticAll();

        header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);
        headingSection.render();
        statisticAll.render();
        footer.render();
    }
}
