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

export interface UserWordData {
    difficulty: string;
    optional: { [key: string]: string };
}

export interface StatisticsData {
    learnedWords: 0;
    optional: { [key: string]: string };
}

export interface SettingsData {
    wordsPerDay: 0;
    optional: { [key: string]: string };
}

// export interface FilterParams {}

export interface View {
    html: string;
    render(): void;
}

export interface GameStatistic extends View {
    type: 'right' | 'wrong';
}

export interface GameDiscription extends View {
    gameParams: [name: string, imgSrc: string, rules: string];
}
export interface LevelView extends View {
    type: [string, string];
}

export interface LevelsView extends View {
    container: HTMLElement;
    levels: Array<[string, string]>;
}

export interface GamesDictionaryView extends View {
    page: 'Игры' | 'Учебник';
}
