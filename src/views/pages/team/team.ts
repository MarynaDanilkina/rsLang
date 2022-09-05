import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import TitleSection from '../../components/mainContent/titleSection/titleSection';
import Team from '../../components/team/team';

export default class Teams implements View {
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.titleSection = new TitleSection();
        this.team = new Team();
    }

    header;

    footer;

    titleSection;

    team;

    html = `<main id="main" class="team_page"></main>`;

    render() {
        this.header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        this.titleSection.render();
        this.team.render();
        this.footer.render();
    }
}
