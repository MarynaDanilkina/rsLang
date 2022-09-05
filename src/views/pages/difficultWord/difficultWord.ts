import DifficultWordDictionaryClose from '../../components/dictionary/level/difficultWordDictionaryClose';
import DictionaryDevelopments from '../../../controllers/dictionary/dictionary';
import currentUser from '../../../models/currentUser';
import UserWords from '../../../api/usersWords';
import Words from '../../../api/words';
import { WordData } from '../../../interfaces/interfaces';
import CardDifficult from '../../components/dictionary/card/cardDifficult';

export default class DifficultWord {
    constructor() {
        this.dictionary = new DictionaryDevelopments();
        this.difficultWordDictionaryClose = new DifficultWordDictionaryClose();
        this.userWords = new UserWords();
        this.words = new Words();
    }

    dictionary;

    difficultWordDictionaryClose;

    userWords;

    words;

    async render() {
        const MAIN = <HTMLElement>document.getElementById('main');

        MAIN.innerHTML = '';

        const getAllWords = await this.userWords.getAllUserWords(currentUser.userId, currentUser.token);
        const getWords: WordData[] = [];

        this.difficultWordDictionaryClose.render();

        if (getAllWords) {
            getAllWords.forEach(async (el) => {
                if (el.difficulty === 'hard') {
                    const getWord = await this.words.getWord(<string>el.wordId);
                    getWords.push(getWord);
                    const card = new CardDifficult(getWord, 'https://rs-lang-kdz.herokuapp.com');
                    card.render();
                }
            });
        }

        this.dictionary.audio();
        this.dictionary.close();
        this.dictionary.difficultWord();
        this.dictionary.difficultDeleteWord();
    }
}
