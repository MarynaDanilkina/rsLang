import { View } from '../../../interfaces/interfaces';
import currentUser from '../../../models/currentUser';
import htmlElements from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import StatisticAll from '../../components/statistic/headingSection/statistic';
import UnauthorizedStatistic from '../../components/statistic/unauthorizedStatistic/unauthorizedStatistic';

export default class Statistic implements View {
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.statisticAll = new StatisticAll();
        this.unauthorizedWarning = new UnauthorizedStatistic();
    }

    header;

    footer;

    statisticAll;

    unauthorizedWarning;

    html = `<main id="main" class="statistic_page"></main>`;

    async render() {
        this.header.render();
        htmlElements.BODY.insertAdjacentHTML('beforeend', this.html);

        if (currentUser.userId) {
            await this.statisticAll.render();
        } else {
            this.unauthorizedWarning.render();
        }

        this.footer.render();
    }
}
