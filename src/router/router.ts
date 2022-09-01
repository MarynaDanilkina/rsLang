import htmlElements from '../models/htmlElements';
import HiddenNavBlur from '../views/components/hiddenNavBlur/hiddenNavBlur';
import Team from '../views/pages/team/team';
import Dictionary from '../views/pages/dictionary/dictionary';
import Main from '../views/pages/main/main';
import GameDiscriptionPage from '../views/pages/games/gameDiscription/gameDiscription';
import gameMap from '../views/components/games/gameDiscriptionSection/gameMap';
import Registration from '../views/pages/registration/registration';
import Statistic from '../views/pages/statistic/statistic';
import CommonGamesPage from '../views/pages/games/commonGamesPage/commonGamesPage';
import Audiocall from '../controllers/games/audiocall';
import Sprint from '../controllers/games/sprint';

export default class Router {
    async locationResolver(location: string) {
        const hiddenNavBlur = new HiddenNavBlur();
        switch (location) {
            case '#/': {
                const main = new Main();

                htmlElements.BODY.innerHTML = '';
                main.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/team/': {
                const team = new Team();

                htmlElements.BODY.innerHTML = '';
                team.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/book/': {
                const book = new Dictionary();

                htmlElements.BODY.innerHTML = '';
                book.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/games/': {
                const games = new CommonGamesPage();

                htmlElements.BODY.innerHTML = '';
                games.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/games/sprint/': {
                const sprint = new GameDiscriptionPage(gameMap[0]);
                const game = new Sprint();

                htmlElements.BODY.innerHTML = '';
                sprint.render();
                hiddenNavBlur.render();
                game.discriptionGamePageListners();

                break;
            }
            case '#/games/audiocall/': {
                const audiocall = new GameDiscriptionPage(gameMap[1]);
                const game = new Audiocall();

                htmlElements.BODY.innerHTML = '';
                audiocall.render();
                hiddenNavBlur.render();
                game.discriptionGamePageListners();

                break;
            }
            case '#/statistic/': {
                const statistic = new Statistic();

                htmlElements.BODY.innerHTML = '';
                await statistic.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/login/': {
                const login = new Registration();

                htmlElements.BODY.innerHTML = '';
                login.render();
                hiddenNavBlur.render();

                break;
            }
            default: {
                // page 404 (not found)
            }
        }
    }

    async windowUpdate() {
        const location = window.location.hash;

        if (location) {
            await this.locationResolver(location);
        } else {
            window.location.href += '#/';
        }
    }

    routClickHandler() {
        document.body.addEventListener('click', async (e) => {
            const link = e.target as HTMLLinkElement;
            if (link.matches('[data-link]')) {
                const hashIndex = link.href.indexOf('#');
                await this.locationResolver(link.href.slice(hashIndex));
            }
        });
    }

    routWindowHandler(): void {
        window.addEventListener('load', this.windowUpdate.bind(this));
        window.addEventListener('hashchange', this.windowUpdate.bind(this));
    }
}
