import Games from '../../components/dictionary/games/games';
import DifficultWordDictionaryClose from '../../components/dictionary/level/difficultWordDictionaryClose';
import DictionaryDevelopments from '../../../controllers/dictionary/dictionary';
import currentUser from '../../../models/currentUser';
import UserWords from '../../../api/usersWords';
import Words from '../../../api/words';
import { WordData } from '../../../interfaces/interfaces';
import CardDifficult from '../../components/dictionary/card/cardDifficult';

export default class DifficultWord {
    async render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.innerHTML = '';
        const dictionary = new DictionaryDevelopments();
        const difficultWordDictionaryClose = new DifficultWordDictionaryClose();
        // const game = new Games();
        const userWords = new UserWords();
        const words = new Words();
        const getAllWords = await userWords.getAllUserWords(currentUser.userId, currentUser.token);
        const getWords: WordData[] = [];
        difficultWordDictionaryClose.render();
        if (getAllWords) {
            getAllWords.forEach(async (el) => {
                if (el.difficulty === 'hard') {
                    const getWord = await words.getWord(el.wordId);
                    getWords.push(getWord);
                    const card = new CardDifficult(getWord, 'https://rs-lang-kdz.herokuapp.com');
                    card.render();
                }
            });
        }
        // game.render();
        dictionary.audio();
        dictionary.close();
        dictionary.difficultWord();
        dictionary.difficultDeleteWord();
    }
}
