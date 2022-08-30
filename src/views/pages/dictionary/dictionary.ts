import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Levels from '../../components/dictionary/levels/levels';
import Games from '../../components/dictionary/games/games';
import './dictionary.sass';
import levelsMap from '../../components/dictionary/levels/levelsMap';
import DictionaryDevelopments from '../../../controllers/dictionary/dictionary';
import DifficultWords from '../../components/dictionary/level/difficultWords';
import LevelsDictionary from '../../components/dictionary/levels/levelsDictionary';

export default class Dictionary implements View {
    html = `<main id="main" class="dictionary_page">
                <h2>Учебник</h2>
            </main>`;

    render() {
        const header = new Header();
        const footer = new Footer();
        const game = new Games();
        const difficultWords = new DifficultWords();
        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);

        const MAIN = <HTMLElement>document.getElementById('main');
        const levels = new LevelsDictionary(levelsMap, MAIN);
        levels.render();
        difficultWords.render();
        game.render();
        footer.render();
        const dictionary = new DictionaryDevelopments();
        dictionary.levels();
        dictionary.difficultWord();
        dictionary.onlyAuthorized();
        dictionary.addDifficultWord();
        dictionary.learnedWord();
    }
}
