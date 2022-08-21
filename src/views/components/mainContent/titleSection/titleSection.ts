import { View } from '../../../../interfaces/interfaces';
import './titleSection.sass';

export default class TitleSection implements View {
    html = `<section id="titleSection" class="title_section">
    <div class="title_section__content">
      <h1>Изучай английский <br />с RSLang</h1>
      <div>Легкий и веселый способ выучить язык.</div>
    </div>
  </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
