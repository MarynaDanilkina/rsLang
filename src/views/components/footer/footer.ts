import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import './footer.sass';

export default class Footer implements View {
    html = `
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__logo">
          <div class="footer__logo__wrapper">
            <a href="https://rs.school/js/">
              <img src="../../../assets/images/rs.svg" class="footer__logo" />
            </a>
          </div>
        </div>
        <div class="footer__gitHub">
          <a href="https://github.com/PavelKizhlo">
            <div class="gh_logo__wrapper">
              <img src="../../../assets/images/gh_logo.svg" class="gh_logo" />
            </div>
            <div class="gh_title">@PavelKizhlo</div>
          </a>
          <a href="https://github.com/MarynaDanilkina">
            <div class="gh_logo__wrapper">
              <img src="../../../assets/images/gh_logo.svg" class="gh_logo" />
            </div>
            <div class="gh_title">@MarynaDanilkina</div>
          </a>
          <a href="https://github.com/vzakharenkova">
            <div class="gh_logo__wrapper">
              <img src="../../../assets/images/gh_logo.svg" class="gh_logo" />
            </div>
            <div class="gh_title">@vzakharenkova</div>
          </a>
        </div>
        <div class="footer_year">
          <div>2022</div>
        </div>
      </div>
    </footer>`;

    render() {
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
    }
}
