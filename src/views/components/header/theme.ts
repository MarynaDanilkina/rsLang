/* eslint-disable no-param-reassign */

import htmlElements from '../../../models/htmlElements';
import State from '../../../models/state';

export default class Theme {
    themeListner() {
        const themeIcon = <HTMLElement>document.querySelector('.header__icon');
        themeIcon.addEventListener('click', this.toggleTheme.bind(this));
    }

    toggleTheme() {
        htmlElements.BODY.classList.toggle('dark');
        if (htmlElements.BODY.classList.contains('dark')) {
            State.theme = 'dark';
        } else {
            State.theme = '';
        }
    }

    updateTheme() {
        if (State.theme === 'dark') {
            htmlElements.BODY.classList.add('dark');
        }
    }
}
