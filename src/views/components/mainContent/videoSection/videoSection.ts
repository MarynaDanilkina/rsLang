import { View } from '../../../../interfaces/interfaces';
import './videoSection.sass';

export default class VideoSection implements View {
    html = `
    <section id="videoSection" class="video_section">
      <div class="player">
        <iframe width="50%" height="500px"
            src="https://www.youtube.com/embed/tgbNymZ7vqY">
        </iframe>
      </div>
    </section>`;

    render() {
        const MAIN = <HTMLElement>document.getElementById('main');
        MAIN.insertAdjacentHTML('beforeend', this.html);
    }
}
