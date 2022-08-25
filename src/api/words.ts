import { WordData } from '../interfaces/interfaces';

class Words {
    private baseURL: string;

    private words: string;

    constructor() {
        this.baseURL = 'https://rs-lang-kdz.herokuapp.com';
        this.words = `${this.baseURL}/words`;
    }

    async getWords(groupNumber: number, pageInGroup: number) {
        const response = await fetch(`${this.words}?group=${groupNumber}&page=${pageInGroup}`);
        return (await response.json()) as Array<WordData>;
    }

    async getWordsinGroup(groupNumber: number) {
        const response = await fetch(`${this.words}?group=${groupNumber}`);
        return (await response.json()) as Array<WordData>;
    }

    async getWord(wordId: string) {
        const response = await fetch(`${this.words}/${wordId}`);
        return (await response.json()) as WordData;
    }
}

export default Words;
