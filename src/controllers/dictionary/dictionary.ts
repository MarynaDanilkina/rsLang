import Words from '../../api/words';
import Card from '../../views/components/dictionary/card/card';
import Games from '../../views/components/dictionary/games/games';
import Levels from '../../views/components/dictionary/levels/levels';
import Pagination from '../../views/components/dictionary/pagination/pagination';
import '../../views/components/dictionary/card/card.sass';
import { WordData } from '../../interfaces/interfaces';
import DictionaryCard from '../../views/pages/dictionary-card/dictionatyCard';

const link = 'https://rs-lang-kdz.herokuapp.com';
const levelsMap: Array<[string, string]> = [
    ['A1', 'Elementary'],
    ['A2', 'Pre-Intermediate'],
    ['B1', 'Intermediate'],
    ['B2', 'Upper-Intermediate'],
    ['C1', 'Advanced'],
    ['C2', 'Proficiency'],
];
export default function DictionaryDevelopments() {
    const container = <HTMLElement>document.getElementById('levels__container');
    container.addEventListener('click', async () => {
        const dictionaryCard = new DictionaryCard();
        await dictionaryCard.render();
    });
}
