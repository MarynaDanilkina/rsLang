import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Games from '../../components/dictionary/games/games';
import './dictionary.sass';
import levelsMap from '../../components/dictionary/levels/levelsMap';
import DictionaryDevelopments from '../../../controllers/dictionary/dictionary';
import DifficultWords from '../../components/dictionary/level/difficultWords';
import LevelsDictionary from '../../components/dictionary/levels/levelsDictionary';

export default class Dictionary implements View {
    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.game = new Games();
        this.difficultWords = new DifficultWords();
        this.dictionary = new DictionaryDevelopments();
    }

    html = `<main id="main" class="dictionary_page">
                <h3>Учебник</h3>
            </main>`;

    header;

    footer;

    game;

    difficultWords;

    dictionary;

    render() {
        this.header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);

        const MAIN = <HTMLElement>document.getElementById('main');
        const levels = new LevelsDictionary(levelsMap, MAIN);
        levels.render();
        this.difficultWords.render();
        this.game.render();
        this.footer.render();
        this.dictionary.levels();
        this.dictionary.difficultWord();
        this.dictionary.onlyAuthorized();
        this.dictionary.addDifficultWord();
        this.dictionary.learnedWord();
    }
}
