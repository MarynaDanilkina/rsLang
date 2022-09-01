import { View } from '../../../../interfaces/interfaces';
import './videoSection.sass';

export default class VideoSection implements View {
    html = `
    <section id="videoSection" class="video_section">
      <div class="player">
        <img class="playerImg" src="../../../assets/images/player.png" /> 
        <img class="playVideo" src="../../../assets/images/playVideo.svg" /> 
      </div>
    </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
