import htmlElements from '../models/htmlElements';
import HiddenNavBlur from '../views/components/hiddenNavBlur/hiddenNavBlur';
import Team from '../views/pages/team/team';
import Dictionary from '../views/pages/dictionary/dictionary';
import Main from '../views/pages/main/main';
import GameDiscriptionPage from '../views/pages/games/gameDiscription/gameDiscription';
import gameMap from '../views/components/games/gameDiscriptionSection/gameMap';
import GameStatisticPage from '../views/pages/games/gameStatistic/gameStatistic';
import Registration from '../views/pages/registration/registration';
import Statistic from '../views/pages/statistic/statistic';

export default class Router {
    locationResolver(location: string) {
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
                const book = new Dictionary('Учебник');

                htmlElements.BODY.innerHTML = '';
                book.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/games/': {
                const games = new Dictionary('Игры');

                htmlElements.BODY.innerHTML = '';
                games.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/games/sprint/': {
                const sprint = new GameDiscriptionPage(gameMap[0]);

                htmlElements.BODY.innerHTML = '';
                sprint.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/games/audiocall/': {
                const audiocall = new GameDiscriptionPage(gameMap[1]);

                htmlElements.BODY.innerHTML = '';
                audiocall.render();
                hiddenNavBlur.render();

                break;
            }
            case '#/statistic/': {
                const statistic = new Statistic();

                htmlElements.BODY.innerHTML = '';
                statistic.render();
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

    windowUpdate() {
        const location = window.location.hash;

        if (location) {
            this.locationResolver(location);
        } else {
            window.location.href += '#/';
        }
    }

    routClickHandler() {
        document.body.addEventListener('click', (e) => {
            const link = e.target as HTMLLinkElement;
            if (link.matches('[data-link]')) {
                const hashIndex = link.href.indexOf('#');
                this.locationResolver(link.href.slice(hashIndex));
            }
        });
    }

    routWindowHandler(): void {
        window.addEventListener('load', this.windowUpdate.bind(this));
        window.addEventListener('hashchange', this.windowUpdate.bind(this));
    }
}
