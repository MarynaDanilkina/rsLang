/* eslint-disable no-param-reassign */
const body = <HTMLElement>document.getElementById(`app`);
export default class Theme {
    start() {
        const icon = <HTMLElement>document.querySelector('.header__icon');
        icon.addEventListener('click', (e) => {
            const event = <HTMLElement>e.target;
            icon.classList.toggle('header__moon');
            icon.classList.toggle('header__sun');
            if (event.classList.contains('header__moon')) {
                this.light();
            }
            if (event.classList.contains('header__sun')) {
                this.dark();
            }
        });
    }

    dark() {
        body.style.backgroundColor = '#ede3fe';
        // main
        const functionalityKind = document.querySelectorAll<HTMLElement>('.functionality_kind');
        const feature = document.querySelectorAll<HTMLElement>('.feature');
        functionalityKind.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });
        feature.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });

        // team
        const teamMember = document.querySelectorAll<HTMLElement>('.team__member');
        teamMember.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });

        // games
        const gamesItemContainer = document.querySelectorAll<HTMLElement>('.games_item__container');
        gamesItemContainer.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });

        // statistic
        const statisticItemContainer = document.querySelectorAll<HTMLElement>('.statistic_item__container');
        statisticItemContainer.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });

        // book
        const difficult = <HTMLElement>document.querySelector('.difficult button');
        if (difficult) {
            difficult.style.backgroundColor = '#d0d5ff';
        }
        const levelsContainerButton = document.querySelectorAll<HTMLElement>('.levels__container .button button');
        levelsContainerButton.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });

        // cards
        const cards = document.querySelectorAll<HTMLElement>('.dictionary_page .card-wrapper .cards');
        cards.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });
        const close = <HTMLElement>document.getElementById(`close`);
        if (close) {
            close.style.backgroundColor = '#d0d5ff';
        }
        const poginationButton = document.querySelectorAll<HTMLElement>('.pogination__button');
        poginationButton.forEach((el) => {
            el.style.backgroundColor = '#d0d5ff';
        });
    }

    light() {
        body.style.backgroundColor = '#FDF8FF';
        // main
        const functionalityKind = document.querySelectorAll<HTMLElement>('.functionality_kind');
        functionalityKind.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });

        // team
        const teamMember = document.querySelectorAll<HTMLElement>('.team__member');
        teamMember.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });

        // games
        const gamesItemContainer = document.querySelectorAll<HTMLElement>('.games_item__container');
        gamesItemContainer.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });

        // statistic
        const statisticItemContainer = document.querySelectorAll<HTMLElement>('.statistic_item__container');
        statisticItemContainer.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });

        // book
        const difficult = <HTMLElement>document.querySelector('.difficult button');
        if (difficult) {
            difficult.style.backgroundColor = '#fff';
        }
        const levelsContainerButton = document.querySelectorAll<HTMLElement>('.levels__container .button button');
        levelsContainerButton.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });

        // cards
        const cards = document.querySelectorAll<HTMLElement>('.cards');
        cards.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        const close = <HTMLElement>document.getElementById(`close`);
        if (close) {
            close.style.backgroundColor = '#fff';
        }
        const poginationButton = document.querySelectorAll<HTMLElement>('.pogination__button');
        poginationButton.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
    }
}
