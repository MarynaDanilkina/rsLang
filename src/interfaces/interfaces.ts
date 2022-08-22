export interface WordData {
    id: 'string';
    group: 0;
    page: 0;
    word: 'string';
    image: 'string';
    audio: 'string';
    audioMeaning: 'string';
    audioExample: 'string';
    textMeaning: 'string';
    textExample: 'string';
    transcription: 'string';
    wordTranslate: 'string';
    textMeaningTranslate: 'string';
    textExampleTranslate: 'string';
}

export interface UserData {
    name: 'string';
    email: 'string';
    password: 'string';
}

export interface AuthData {
    message: 'string';
    token: 'string';
    refreshToken: 'string';
    userId: 'string';
    name: 'string';
}

export interface UserWordData {
    difficulty: 'string';
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