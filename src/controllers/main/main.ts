import htmlElements from '../../models/htmlElements';

export default class MainPageControllers {
    toggleHiddenMenu(e: Event) {
        const burger = document.querySelector('.burger');
        if (e.target === burger) {
            const hiddenMenu = <HTMLDivElement>document.getElementById('hiddenMenu');
            const blur = <HTMLDivElement>document.querySelector('.dark-field');

            // hiddenMenu.classList.toggle('open');
            blur.classList.toggle('open');
            if (hiddenMenu.classList.contains('open')) {
                hiddenMenu.classList.toggle('open');
                setTimeout(() => {
                    hiddenMenu.style.display = 'none';
                }, 500);
            } else {
                hiddenMenu.style.display = 'block';
                setTimeout(() => {
                    hiddenMenu.classList.toggle('open');
                }, 0);
            }
        }
    }

    hiddenMenuListner() {
        htmlElements.BODY.addEventListener('click', (e) => this.toggleHiddenMenu.apply(this, [e]));
    }
}
