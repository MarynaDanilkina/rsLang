import { View } from '../../../interfaces/interfaces';
import currentUser from '../../../models/currentUser';
import htmlElements from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import HeadingSection from '../../components/statistic/headingSection/headingSection';
import StatisticAll from '../../components/statistic/statistilAll/statistic';
import UnauthorizedStatistic from '../../components/statistic/unauthorizedStatistic/unauthorizedStatistic';

export default class Statistic implements View {
    html = `<main id="main" class="statistic_page"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const headingSection = new HeadingSection();
        const statisticAll = new StatisticAll();
        const unauthorizedWarning = new UnauthorizedStatistic();

        header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);

        if (currentUser.userId) {
            headingSection.render();
            statisticAll.render();
        } else {
            unauthorizedWarning.render();
        }
        footer.render();
    }
}
