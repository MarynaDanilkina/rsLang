import { View } from '../../../../interfaces/interfaces';
import './unauthorizedStatistic.sass';

export default class UnauthorizedStatistic implements View {
    html = `<section id="statistic-unauthorized" class="statistic-unauthorized">
        <h3>Статистика</h3>
        <div class="statistic-unauthorized-warning">
          Чтобы получить данные статистики по результатам обучения, 
          пожалуйста, войдите в профиль или зарегистрируйтесь, если у Вас еще нет аккаунта 
        </div>
      </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
