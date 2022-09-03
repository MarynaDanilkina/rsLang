/* eslint-disable no-param-reassign */
const body = <HTMLElement>document.getElementById(`app`);
export default class Theme {
    start() {
        const icon = <HTMLElement>document.querySelector('.header__icon');
        if (icon.classList.contains('header__moon')) {
            this.light();
        }
        if (icon.classList.contains('header__sun')) {
            this.dark();
        }

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
        body.style.backgroundColor = '#00093c';
        const headerLogo = <HTMLImageElement>document.querySelector('.header__logo');
        headerLogo.src = '../../../assets/images/header_logo2.svg';
        const navigation = document.querySelectorAll<HTMLElement>('.nav__link');
        navigation.forEach((el) => {
            el.style.color = '#fff';
        });

        // main
        const titleSection = <HTMLElement>document.querySelector('.title_section');
        if (titleSection) {
            titleSection.style.backgroundImage = "url('../../../assets/backgrounds/title_background2.png')";
        }
        const functionalityKind = document.querySelectorAll<HTMLElement>('.functionality_kind');
        const feature = document.querySelectorAll<HTMLElement>('.feature');
        functionalityKind.forEach((el) => {
            el.style.backgroundColor = '#e1f0fd';
        });
        feature.forEach((el) => {
            el.style.backgroundColor = '#e1f0fd';
        });
        const informationSectionContent = <HTMLElement>document.querySelector('.information_section__content');
        if (informationSectionContent) {
            informationSectionContent.style.color = '#fff';
        }
        const children = <HTMLImageElement>document.getElementById('children');
        if (children) {
            children.src = '../../../assets/images/children2.svg';
        }
        const teenagers = <HTMLImageElement>document.getElementById('teenagers');
        if (teenagers) {
            teenagers.src = '../../../assets/images/teenagers2.svg';
        }
        const adults = <HTMLImageElement>document.getElementById('adults');
        if (adults) {
            adults.src = '../../../assets/images/adults2.svg';
        }
        const bar = document.querySelectorAll<HTMLElement>('.bar');
        bar.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        const hiddenNav = <HTMLImageElement>document.querySelector('.hidden_nav');
        if (hiddenNav) {
            hiddenNav.style.backgroundColor = '#00093c';
        }
        const hiddenNavItem = document.querySelectorAll<HTMLElement>('.hidden_nav_item');
        if (hiddenNavItem) {
            hiddenNavItem.forEach((el) => {
                el.style.color = '#fff';
            });
        }

        // team
        const teamMember = document.querySelectorAll<HTMLElement>('.team__member');
        teamMember.forEach((el) => {
            el.style.backgroundColor = '#e1f0fd';
        });
        const teamHeader = <HTMLElement>document.querySelector('.team__header');
        if (teamHeader) {
            teamHeader.style.color = '#fff';
        }

        // games
        const gamesItemContainer = document.querySelectorAll<HTMLElement>('.games_item__container');
        gamesItemContainer.forEach((el) => {
            el.style.backgroundColor = '#e1f0fd';
        });
        const gamesPageH3 = <HTMLElement>document.querySelector('.games_page h3');
        if (gamesPageH3) {
            gamesPageH3.style.color = '#fff';
        }

        // statistic
        const statisticItemContainer = document.querySelectorAll<HTMLElement>('.statistic_item__container');
        statisticItemContainer.forEach((el) => {
            el.style.backgroundColor = '#e1f0fd';
        });
        const statisticHeading = <HTMLElement>document.querySelector('.statistic-heading');
        if (statisticHeading) {
            statisticHeading.style.color = '#fff';
        }

        // book
        const difficult = <HTMLElement>document.querySelector('.difficult button');
        if (difficult) {
            difficult.style.backgroundColor = '#e1f0fd';
        }
        const levelsContainerButton = document.querySelectorAll<HTMLElement>('.levels__container .button button');
        levelsContainerButton.forEach((el) => {
            el.style.backgroundColor = '#e1f0fd';
        });
        const dictionaryPageH3 = <HTMLElement>document.querySelector('.dictionary_page h3');
        if (dictionaryPageH3) {
            dictionaryPageH3.style.color = '#fff';
        }
        const levelsTitle = <HTMLElement>document.querySelector('.levels__title');
        if (levelsTitle) {
            levelsTitle.style.color = '#fff';
        }

        // cards
    }

    light() {
        body.style.backgroundColor = '#FDF8FF';
        const headerLogo = <HTMLImageElement>document.querySelector('.header__logo');
        headerLogo.src = '../../../assets/images/header_logo.svg';
        const navigation = document.querySelectorAll<HTMLElement>('.nav__link');
        navigation.forEach((el) => {
            el.style.color = '#000';
        });
        const bar = document.querySelectorAll<HTMLElement>('.bar');
        bar.forEach((el) => {
            el.style.backgroundColor = '#00093c';
        });
        // main
        const informationSectionContent = <HTMLElement>document.querySelector('.information_section__content');
        if (informationSectionContent) {
            informationSectionContent.style.color = '#000';
        }
        const titleSection = <HTMLElement>document.querySelector('.title_section');
        if (titleSection) {
            titleSection.style.backgroundImage = "url('../../../assets/backgrounds/title_background.png')";
        }
        const functionalityKind = document.querySelectorAll<HTMLElement>('.functionality_kind');
        const feature = document.querySelectorAll<HTMLElement>('.feature');
        functionalityKind.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        feature.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        const children = <HTMLImageElement>document.getElementById('children');
        if (children) {
            children.src = '../../../assets/images/children.svg';
        }
        const teenagers = <HTMLImageElement>document.getElementById('teenagers');
        if (teenagers) {
            teenagers.src = '../../../assets/images/teenagers.svg';
        }
        const adults = <HTMLImageElement>document.getElementById('adults');
        if (adults) {
            adults.src = '../../../assets/images/adults.svg';
        }
        const hiddenNav = <HTMLImageElement>document.querySelector('.hidden_nav');
        if (hiddenNav) {
            hiddenNav.style.backgroundColor = '#fff';
        }
        const hiddenNavItem = document.querySelectorAll<HTMLElement>('.hidden_nav_item');
        if (hiddenNavItem) {
            hiddenNavItem.forEach((el) => {
                el.style.color = '#000';
            });
        }

        // team
        const teamMember = document.querySelectorAll<HTMLElement>('.team__member');
        teamMember.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        const teamHeader = <HTMLElement>document.querySelector('.team__header');
        if (teamHeader) {
            teamHeader.style.color = '#000';
        }

        // games
        const gamesItemContainer = document.querySelectorAll<HTMLElement>('.games_item__container');
        gamesItemContainer.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        const gamesPageH3 = <HTMLElement>document.querySelector('.games_page h3');
        if (gamesPageH3) {
            gamesPageH3.style.color = '#000';
        }

        // statistic
        const statisticItemContainer = document.querySelectorAll<HTMLElement>('.statistic_item__container');
        statisticItemContainer.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        const statisticHeading = <HTMLElement>document.querySelector('.statistic-heading');
        if (statisticHeading) {
            statisticHeading.style.color = '#000';
        }

        // book
        const difficult = <HTMLElement>document.querySelector('.difficult button');
        if (difficult) {
            difficult.style.backgroundColor = '#fff';
        }
        const levelsContainerButton = document.querySelectorAll<HTMLElement>('.levels__container .button button');
        levelsContainerButton.forEach((el) => {
            el.style.backgroundColor = '#fff';
        });
        const dictionaryPageH3 = <HTMLElement>document.querySelector('.dictionary_page h3');
        if (dictionaryPageH3) {
            dictionaryPageH3.style.color = '#000';
        }
        const levelsTitle = <HTMLElement>document.querySelector('.levels__title');
        if (levelsTitle) {
            levelsTitle.style.color = '#000';
        }

        // cards
    }
}
