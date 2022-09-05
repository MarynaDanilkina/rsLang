import htmlElements from '../../models/htmlElements';

export default class MainPageControllers {
    toggleHiddenMenu(e: Event) {
        const burger = document.querySelector('.burger');
        const blur = <HTMLDivElement>document.querySelector('.dark-field');
        const target = <HTMLElement>e.target;

        if (target.classList.contains('hidden_nav_item')) {
            htmlElements.BODY.style.overflowY = 'scroll';
        }

        if (target === burger || target === blur || target.parentElement === burger) {
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
