import UserStat from '../../../../api/usersStat';
import currentUser from '../../../../models/currentUser';
import './headingSection.sass';
import './statistic.sass';

export default class StatisticAll {
    constructor() {
        this.userStatsAPI = new UserStat();
    }

    userStatsAPI;

    learnedWords = 0;

    rightAnswersPercent = 0;

    sprintRightAnswersPercent = 0;

    audiocallRightAnswersPercent = 0;

    audiocallLearnedWords = 0;

    sprintLearnedWords = 0;

    audiocallRightAnswers = 0;

    audiocallWrongAnswers = 0;

    sprintRightAnswers = 0;

    sprintWrongAnswers = 0;

    audiocallSession = 0;

    sprintSession = 0;

    allRightAnswers = 0;

    allWrongAnswers = 0;

    html = '';

    createHTML() {
        this.html = `<section id="statistic-heading" class="statistic-heading">
                        <h2>Статистика</h2>
                        <div class="results_figures">
                        <div class="words-figure">
                            <div class="figure">${this.learnedWords}</div>
                            <p>Слов изучено</p>
                        </div>
                        <div class="answers-figure">
                            <div class="figure">${this.rightAnswersPercent}%</div>
                            <p>Правильных ответов</p>
                        </div>
                        </div>
                    </section>
                    <section class="statistic">
                        <div class="statistic_item">
                        <div class="statistic_item__container">
                            <p class="statistic__name">Спринт</p>
                            <p class="statistic__info">
                            Изучено ${this.sprintLearnedWords} слов
                            </p>
                            <p class="statistic__info">
                            Правильных ответов: ${this.sprintRightAnswersPercent}%
                            </p>
                            <p class="statistic__info">
                            Самая длинная серия правильных ответов: ${this.sprintSession}
                            </p>
                        </div>
                        <div class="statistic_item__container">
                            <p class="statistic__name">Аудиовызов</p>
                            <p class="statistic__info">
                            Изучено ${this.audiocallLearnedWords} слов
                            </p>
                            <p class="statistic__info">
                            Правильных ответов: ${this.audiocallRightAnswersPercent}%
                            </p>
                            <p class="statistic__info">
                            Самая длинная серия правильных ответов: ${this.audiocallSession}
                            </p>
                        </div>
                        </div>
                    </section>`;
    }

    async getTodayResults() {
        const currentDay = new Date().toLocaleDateString('en-US');
        const currentDayResults = await this.userStatsAPI.getStatistics(currentUser.userId, currentUser.token);
        if (currentDayResults?.optional.day === currentDay) {
            this.learnedWords = currentDayResults.learnedWords || 0;
            this.audiocallLearnedWords = <number>currentDayResults.optional.audiocallLearnedWords || 0;
            this.sprintLearnedWords = <number>currentDayResults.optional.sprintLearnedWords || 0;
            this.audiocallWrongAnswers = <number>currentDayResults.optional.audiocallWrongAnswers || 0;
            this.sprintWrongAnswers = <number>currentDayResults.optional.sprintWrongAnswers || 0;
            this.audiocallRightAnswers = <number>currentDayResults.optional.audiocallRightAnswers || 0;
            this.sprintRightAnswers = <number>currentDayResults.optional.sprintRightAnswers || 0;
            this.audiocallSession = <number>currentDayResults.optional.audiocallSession || 0;
            this.sprintSession = <number>currentDayResults.optional.sprintSession || 0;
            this.allRightAnswers = this.audiocallRightAnswers + this.sprintRightAnswers;
            this.allWrongAnswers = this.audiocallWrongAnswers + this.sprintWrongAnswers;
            this.rightAnswersPercent =
                Math.round((this.allRightAnswers / (this.allRightAnswers + this.allWrongAnswers)) * 100) || 0;
            this.sprintRightAnswersPercent =
                Math.round((this.sprintRightAnswers / (this.sprintRightAnswers + this.sprintWrongAnswers)) * 100) || 0;
            this.audiocallRightAnswersPercent =
                Math.round(
                    (this.audiocallRightAnswers / (this.audiocallRightAnswers + this.audiocallWrongAnswers)) * 100
                ) || 0;
            console.log(currentDayResults);
            return currentDayResults;
        }
        return undefined;
    }

    async render() {
        await this.getTodayResults();
        this.createHTML();
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
