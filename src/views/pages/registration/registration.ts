import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import './registration.sass';

export default class Registration implements View {
    html = `<main id="main" class="registration_page">
              <section id="registration_section" class="registration_section">
                <div class="registration_owl">
                  <img class="owl_logo registration_owl_logo" src="../../../assets/images/owl.png" />
                  <img class="registration_speech_logo" src="../../../assets/images/speech.png" />
                    <div class="registration_text">
                      Войдите в систему или зарегистрируйтесь, если у вас ещё нет аккаунта
                    </div>
                </div>
                <div class="reg-form_wrapper">
                  <div class="reg-form_header" id="reg-buttons">
                    <div class="page_title active" id="log-in">Вход</div>
                    <div class="page_title" id="signup">Регистрация</div>
                  </div>
                  <form class="login_form active">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="submit" value="Войти" />
                  </form>
                  <form class="signup_form">
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Name" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Repeat password" />
                    <input type="submit" value="Зарегистрироваться" />
                  </form>
                </div>
              </section>
            </main>`;

    render() {
        const header = new Header();
        const footer = new Footer();

        header.render();
        htmlConsts.BODY.insertAdjacentHTML('beforeend', this.html);
        footer.render();

        const regButtons = <HTMLDivElement>document.getElementById('reg-buttons');
        regButtons.addEventListener('click', (evt) => {
            const target = <HTMLElement>evt.target;
            const logInFormButton = <HTMLDivElement>document.getElementById('log-in');
            const signupFormButton = <HTMLDivElement>document.getElementById('signup');
            const forms = document.querySelectorAll('form');

            if (
                (target === logInFormButton && signupFormButton.classList.contains('active')) ||
                (target === signupFormButton && logInFormButton.classList.contains('active'))
            ) {
                logInFormButton.classList.toggle('active');
                signupFormButton.classList.toggle('active');
                forms.forEach((form) => form.classList.toggle('active'));
            }
        });
    }
}
