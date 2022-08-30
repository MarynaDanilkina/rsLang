import './difficult2.sass';

export default class DifficultWords {
    html = `
        <div class="difficult">
            <button disabled='disabled'>
                <div>
                  <h3>Сложные слова</h3>
                </div>
                <img src="../../../../assets/images/plus.png" alt="plus">
            </button>
        </div>
        `;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
