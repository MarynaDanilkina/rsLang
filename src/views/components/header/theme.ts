/* eslint-disable no-param-reassign */

import htmlElements from '../../../models/htmlElements';

export default class Theme {
    themeListner() {
        const themeIcon = <HTMLElement>document.querySelector('.header__icon');
        themeIcon.addEventListener('click', this.toggleTheme);
    }

    toggleTheme() {
        htmlElements.BODY.classList.toggle('dark');
    }
}
