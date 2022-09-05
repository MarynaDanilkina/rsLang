export interface WordData {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}
export interface UserData {
    name: string;
    email: string;
    password: string;
}

export interface AuthData {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}

export type optionalOfUserWord = {
    [key: string]: string | number;
    counter: number;
    wrongCounter: number;
    rightCounter: number;
};

export interface UserWordData {
    difficulty: string;
    wordId?: string;
    id?: string;
    optional?: optionalOfUserWord;
}

export interface StatisticsData {
    learnedWords: number;
    optional: {
        day: string;
        audiocallLearnedWords?: number;
        sprintLearnedWords?: number;
        audiocallWrongAnswers?: number;
        sprintWrongAnswers?: number;
        audiocallRightAnswers?: number;
        sprintRightAnswers?: number;
        audiocallSession?: number;
        sprintSession?: number;
    };
}

export interface SettingsData {
    wordsPerDay: 0;
    optional: { [key: string]: string };
}

export interface View {
    html: string;
    render(): void;
}

export interface GameStatistic extends View {
    gameWords: WordData[];
    rightAnswers: Array<number>;
    wrongAnswers: Array<number>;
}

export interface GameStatisticList extends View {
    type: 'right' | 'wrong';
    gameWords: WordData[];
    answers: Array<number>;
}

export interface GameStatisticItem extends View {
    type: 'right' | 'wrong';
    word: WordData;
}

export interface GameDiscription extends View {
    gameParams: [name: string, imgSrc: string, rules: string];
}
export interface LevelView extends View {
    type: [string, string, string];
}

export interface LevelsView extends View {
    container: HTMLElement;
    levels: Array<[string, string, string]>;
}

export interface GamesDictionaryView extends View {
    page: 'Игры' | 'Учебник';
}
