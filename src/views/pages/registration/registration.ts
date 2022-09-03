import { View } from '../../../interfaces/interfaces';
import htmlConsts from '../../../models/htmlElements';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import RegController from '../../../controllers/pages/regConroller';
import './registration.sass';
import '../spinner.sass';
import Theme from '../../components/header/theme';

export default class Registration implements View {
    private controller: RegController;

    constructor() {
        this.controller = new RegController();
    }

    html = `<main id="main" class="registration_page">
              <section id="registration_section" class="registration_section">
                <div class="registration_owl">
                  <img class="owl_logo registration_owl_logo" src="../../../assets/images/owlReg.svg" />
                </div>
                <div class="reg-form_wrapper">
                  <div class="reg-form_header" id="reg-buttons">
                    <div class="page_title selected_form" id="log-in">Вход</div>
                    <div class="page_title" id="signup">Регистрация</div>
                  </div>
                  <p class="error-message" id="error-message"></p>
                  <form class="form form_login selected_form" id="login-form">
                    <input type="email" placeholder="Введите еmail ..." id="login-email" autocomplete="off" />
                    <input type="password" placeholder="Введите пароль ..." id="login-password" />
                    <button class="form__button" id="login-button"/>Войти</button> 
                  </form>
                  <form class="form form_signup" id="signup-form">
                    <input type="email" placeholder="Введите еmail ..." id="signup-email" autocomplete="off" />
                    <input type="text" placeholder="Введите имя ..." id="signup-name" autocomplete="off" />
                    <input type="password" placeholder="Придумайте пароль ..." id="signup-password" />
                    <input type="password" placeholder="Повторите пароль ..." id="signup-password-repeat" />
                    <button class="form__button" id="signup-button"/>Зарегистрироваться</button> 
                  </form>
                  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
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
            const errorMessage = <HTMLParagraphElement>document.getElementById('error-message');
            const forms = document.querySelectorAll('form');

            if (
                (target === logInFormButton && signupFormButton.classList.contains('selected_form')) ||
                (target === signupFormButton && logInFormButton.classList.contains('selected_form'))
            ) {
                logInFormButton.classList.toggle('selected_form');
                signupFormButton.classList.toggle('selected_form');
                errorMessage.classList.remove('active');
                forms.forEach((form) => form.classList.toggle('selected_form'));
            }
        });

        this.controller.start();
    }
}
