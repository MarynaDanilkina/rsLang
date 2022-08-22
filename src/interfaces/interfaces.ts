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
