import { AuthData } from '../interfaces/interfaces';
import currentUser from '../models/currentUser';

export function testEmail(this: HTMLInputElement) {
    this.classList.add('warning');
    const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValid = emailRegExp.test(this.value);

    if (isValid || !this.value) {
        this.classList.remove('warning');
    }

    if (isValid) {
        this.classList.add('valide');
    } else {
        this.classList.remove('valide');
    }
}

export function testLength(this: HTMLInputElement, length: number) {
    this.classList.add('warning');
    const isValid = this.value.trim().length > length;

    if (isValid || !this.value) {
        this.classList.remove('warning');
    }

    if (isValid) {
        this.classList.add('valide');
    } else {
        this.classList.remove('valide');
    }
}

export function equalCheck(this: HTMLInputElement, input: HTMLInputElement) {
    this.classList.add('warning');
    const isValid = this.value === input.value;

    if (isValid || !this.value) {
        this.classList.remove('warning');
    }

    if (isValid && this.value) {
        this.classList.add('valide');
    } else {
        this.classList.remove('valide');
    }
}

export function enableSubmit(this: HTMLButtonElement, inputs: Array<HTMLInputElement>) {
    const isValide = inputs.every((input) => input.classList.contains('valide'));
    this.disabled = !isValide;
}

export function showSpinner(isShown: boolean) {
    const spinner = <HTMLDivElement>document.querySelector('.lds-roller');
    if (isShown) {
        spinner.classList.add('active');
    } else {
        spinner.classList.remove('active');
    }
}

export function saveCurrentUser(auth: AuthData) {
    currentUser.message = auth.message;
    currentUser.name = auth.name;
    currentUser.token = auth.token;
    currentUser.refreshToken = auth.refreshToken;
    currentUser.userId = auth.userId;

    localStorage.setItem('authData', JSON.stringify(currentUser));
}
