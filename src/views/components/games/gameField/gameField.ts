import { View } from '../../../../interfaces/interfaces';
import './gameField.sass';

export default class GameField implements View {
    html = `<section class="game-wrapper">
                <svg display="none">
                    <symbol id="sound" viewBox="0 0 47 41">
                        <path
                        d="M41.1476 20.0332C41.1476 14.9665 39.2676 10.3665 36.2353 7.03317L38.6611 4.3665C42.2998 8.3665 44.574 13.8998 44.574 19.9998C44.574 26.0998 42.3301 31.6332 38.6611 35.6332L36.2353 32.9665C39.2979 29.6665 41.1476 25.0998 41.1476 20.0332ZM29.9888 13.9332C31.414 15.4998 32.2934 17.6665 32.2934 20.0332C32.2934 22.3998 31.414 24.5665 29.9888 26.1332L27.563 23.4665C28.3818 22.5998 28.8669 21.3665 28.8669 20.0332C28.8669 18.6998 28.3818 17.4665 27.563 16.5998L29.9888 13.9332ZM34.325 9.13317C36.8721 11.9332 38.4185 15.7665 38.4185 19.9998C38.4185 24.2332 36.8417 28.0998 34.325 30.8665L31.8992 28.1998C33.8095 26.0998 34.9921 23.1998 34.9921 19.9665C34.9921 16.7665 33.8095 13.8665 31.8992 11.7332L34.325 9.13317ZM3.72949 11.9665H8.00498V28.0665H3.72949V11.9665ZM9.79401 11.9665L24.8037 2.1665V37.8998L9.79401 28.0665V11.9665Z"
                        fill="#202855"
                        />
                    </symbol>
                </svg>
                <div class="game__background">
                    <div class="game__container" id="game__container">
                    </div>
                </div>
            </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');

        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
