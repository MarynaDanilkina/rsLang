import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import TitleSection from '../../components/mainContent/titleSection/titleSection';
import Team from '../../components/team/team';

export default class Teams implements View {
    html = `<main id="main" class="team_page"></main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const tilteSection = new TitleSection();
        const team = new Team();
        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        tilteSection.render();
        team.render();
        footer.render();
    }
}
