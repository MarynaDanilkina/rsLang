import '../../views/components/dictionary/card/card.sass';
import DictionaryCard from '../../views/pages/dictionary-card/dictionatyCard';

let page = 0;
export default class DictionaryDevelopments {
    container() {
        const container = <HTMLElement>document.getElementById('levels__container');

        container.addEventListener('click', async () => {
            const dictionaryCard = new DictionaryCard(page);
            await dictionaryCard.render();
        });
    }

    next() {
        const next = <HTMLElement>document.getElementById('next');
        next.addEventListener('click', async () => {
            if (page < 29) {
                page += 1;
                const dictionaryCard = new DictionaryCard(page);
                await dictionaryCard.render();
            }
        });
    }

    back() {
        const back = <HTMLElement>document.getElementById('back');
        back.addEventListener('click', async () => {
            if (page > 0) {
                page -= 1;
                const dictionaryCard = new DictionaryCard(page);
                await dictionaryCard.render();
            }
        });
    }

    fullNext() {
        const fullNext = <HTMLElement>document.getElementById('full_next');
        fullNext.addEventListener('click', async () => {
            if (page < 29) {
                page = 29;
                const dictionaryCard = new DictionaryCard(page);
                await dictionaryCard.render();
            }
        });
    }

    fullBack() {
        const fullBack = <HTMLElement>document.getElementById('full_back');
        fullBack.addEventListener('click', async () => {
            if (page > 0) {
                page = 0;
                const dictionaryCard = new DictionaryCard(page);
                await dictionaryCard.render();
            }
        });
    }
}
