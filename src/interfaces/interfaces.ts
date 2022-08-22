export interface View {
    html: string;
    render(): void;
}
export interface LevelView extends View {
    type: [string, string];
}

export interface LevelsView extends View {
    levels: Array<[string, string]>;
}

export interface GamesDictionaryView extends View {
    page: 'Игры' | 'Учебник';
}
