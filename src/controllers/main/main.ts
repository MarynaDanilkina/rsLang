import htmlElements from '../../models/htmlElements';

export default class MainPageControllers {
    toggleHiddenMenu(e: Event) {
        const burger = document.querySelector('.burger');
        const blur = <HTMLDivElement>document.querySelector('.dark-field');

        if (e.target === burger || e.target === blur) {
            const hiddenMenu = <HTMLDivElement>document.getElementById('hiddenMenu');

            blur.classList.toggle('open');
            if (hiddenMenu.classList.contains('open')) {
                hiddenMenu.classList.toggle('open');
                setTimeout(() => {
                    hiddenMenu.style.display = 'none';
                    htmlElements.BODY.style.overflowY = 'scroll';
                }, 500);
            } else {
                hiddenMenu.style.display = 'block';
                setTimeout(() => {
                    hiddenMenu.classList.toggle('open');
                    htmlElements.BODY.style.overflowY = 'hidden';
                }, 0);
            }
        }
    }

    hiddenMenuListner() {
        htmlElements.BODY.addEventListener('click', (e) => this.toggleHiddenMenu.apply(this, [e]));
    }
}
