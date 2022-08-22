export interface View {
    html: string;
    render(): void;
}
export interface GameStatistic extends View {
    type: 'right' | 'wrong';
}
