export default class Router {
    locationResolver(location: string) {
        switch (location) {
            case '#/': {
                // render main page
            }
            case '#/team/': {
                // render team page
                break;
            }
            case '#/book/': {
                // render student book (dictionary) page
                break;
            }
            case '#/games/': {
                // render games page
                break;
            }
            case '#/games/sprint/': {
                // render sprint game page
                break;
            }
            case '#/games/audiocall/': {
                // render audiocall game page
                break;
            }
            case '#/staistic/': {
                // render user statistic page
                break;
            }
            case '#/login/': {
                // render user authorization page
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
        }
    }

    routClickHandler() {
        document.body.addEventListener('click', (e) => {
            const link = e.target as HTMLLinkElement;
            console.log(link);
            if (link.matches('[data-link]')) {
                e.preventDefault();
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
