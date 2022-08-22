import { UserData, AuthData } from '../interfaces/interfaces';

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
                console.log('Incorrect e-mail or password');
            }
            return (await response.json()) as AuthData;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default Authorization;
