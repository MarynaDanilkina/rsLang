import { UserData, AuthData } from '../interfaces/interfaces';
import currentUser from '../models/currentUser';

class Authorization {
    private baseURL: string;

    private signin: string;

    constructor() {
        this.baseURL = 'https://rs-lang-kdz.herokuapp.com';
        this.signin = `${this.baseURL}/signin`;
    }

    async signIn(user: Omit<UserData, 'name'>) {
        try {
            const response = await fetch(this.signin, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (response.status === 403) {
                const auth = { ...currentUser };
                auth.message = 'Некорректный пароль или email !';
                console.log('Incorrect e-mail or password');
                return auth;
            }
            if (response.status === 404) {
                const auth = { ...currentUser };
                auth.message = 'Пользователь с таким email отсутствует !';
                console.log('Incorrect e-mail or password');
                return auth;
            }
            return (await response.json()) as AuthData;
        } catch (err) {
            const auth = { ...currentUser };
            auth.message = 'Возникли неполадки с сервером !';
            console.log(err);
            return auth;
        }
    }
}

export default Authorization;
