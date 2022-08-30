import Authorization from '../../api/authorization';
import User from '../../api/users';
import { enableSubmit, equalCheck, testEmail, testLength, showSpinner, saveCurrentUser } from '../../utils/utils';
import currentUser from '../../models/currentUser';

export default class RegController {
    private authorization: Authorization;

    private user: User;

    constructor() {
        this.authorization = new Authorization();
        this.user = new User();
    }

    start() {
        const loginButton = <HTMLButtonElement>document.getElementById('login-button');
        const signupButton = <HTMLButtonElement>document.getElementById('signup-button');

        this.validateLogin();
        this.validateSignin();

        loginButton.addEventListener('click', this.loginUser);
        signupButton.addEventListener('click', this.registerUser);
    }

    private validateLogin() {
        const loginForm = <HTMLFormElement>document.getElementById('login-form');
        const loginButton = <HTMLButtonElement>document.getElementById('login-button');
        const loginEmail = <HTMLInputElement>document.getElementById('login-email');
        const loginPassword = <HTMLInputElement>document.getElementById('login-password');
        const errorMessage = <HTMLParagraphElement>document.getElementById('error-message');

        loginButton.disabled = true;

        loginForm.addEventListener('input', (evt) => {
            switch (evt.target) {
                case loginEmail:
                    testEmail.call(loginEmail);
                    break;
                case loginPassword:
                    testLength.call(loginPassword, 7);
                    break;
                default:
                    break;
            }

            errorMessage.classList.remove('active');
            enableSubmit.call(loginButton, [loginEmail, loginPassword]);
        });
    }

    private validateSignin() {
        const loginForm = <HTMLFormElement>document.getElementById('signup-form');
        const signupButton = <HTMLButtonElement>document.getElementById('signup-button');
        const signupEmail = <HTMLInputElement>document.getElementById('signup-email');
        const signupName = <HTMLInputElement>document.getElementById('signup-name');
        const signupPassword = <HTMLInputElement>document.getElementById('signup-password');
        const signupPasswordRepeat = <HTMLInputElement>document.getElementById('signup-password-repeat');
        const errorMessage = <HTMLParagraphElement>document.getElementById('error-message');

        signupButton.disabled = true;

        loginForm.addEventListener('input', (evt) => {
            switch (evt.target) {
                case signupEmail:
                    testEmail.call(signupEmail);
                    break;
                case signupName:
                    testLength.call(signupName, 3);
                    break;
                case signupPassword:
                    testLength.call(signupPassword, 7);
                    equalCheck.call(signupPasswordRepeat, signupPassword);
                    break;
                case signupPasswordRepeat:
                    equalCheck.call(signupPasswordRepeat, signupPassword);
                    break;
                default:
                    break;
            }

            errorMessage.classList.remove('active');
            enableSubmit.call(signupButton, [signupEmail, signupName, signupPassword, signupPasswordRepeat]);
        });
    }

    private loginUser = async () => {
        const loginEmail = <HTMLInputElement>document.getElementById('login-email');
        const loginPassword = <HTMLInputElement>document.getElementById('login-password');
        const errorMessage = <HTMLParagraphElement>document.getElementById('error-message');

        showSpinner(true);
        const auth = await this.authorization.signIn({
            email: loginEmail.value,
            password: loginPassword.value,
        });

        if (auth.message === 'Authenticated') {
            saveCurrentUser(auth);
        } else {
            errorMessage.classList.add('active');
            errorMessage.innerHTML = auth.message;
            loginEmail.classList.remove('valide');
            loginEmail.classList.add('warning');
        }

        const isSuccess = !!(await this.user.getUser(currentUser.userId, currentUser.token));
        if (isSuccess) {
            window.location.hash = '#/';
        }

        showSpinner(false);
    };

    private registerUser = async () => {
        const signupEmail = <HTMLInputElement>document.getElementById('signup-email');
        const signupName = <HTMLInputElement>document.getElementById('signup-name');
        const signupPassword = <HTMLInputElement>document.getElementById('signup-password');
        const errorMessage = <HTMLParagraphElement>document.getElementById('error-message');

        showSpinner(true);
        const createStatus = await this.user.createNewUser({
            name: signupName.value.trim(),
            email: signupEmail.value.trim(),
            password: signupPassword.value.trim(),
        });

        switch (createStatus) {
            case 417:
                errorMessage.classList.add('active');
                signupEmail.classList.remove('valide');
                signupEmail.classList.add('warning');
                errorMessage.innerHTML = 'Пользователь с таким email уже существует !';
                break;
            case 422:
                errorMessage.classList.add('active');
                signupEmail.classList.remove('valide');
                signupPassword.classList.remove('valide');
                signupEmail.classList.add('warning');
                signupPassword.classList.add('warning');
                errorMessage.innerHTML = 'Некорректный пароль или email !';
                break;
            case 500:
                errorMessage.classList.add('active');
                errorMessage.innerHTML = 'Возникли неполадки с сервером !';
                break;
            default:
                break;
        }

        if (createStatus === 200) {
            const auth = await this.authorization.signIn({
                email: signupEmail.value.trim(),
                password: signupPassword.value.trim(),
            });

            if (auth) {
                saveCurrentUser(auth);
            }

            const isSuccess = !!(await this.user.getUser(currentUser.userId, currentUser.token));

            if (isSuccess) {
                window.location.hash = '#/';
            }
        }

        showSpinner(false);
    };
}
