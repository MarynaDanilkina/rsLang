import { WordData /* FilterParams */ } from '../interfaces/interfaces';

class UserArgWords {
    private baseURL: string;

    private users: string;

    constructor() {
        this.baseURL = 'https://rs-lang-kdz.herokuapp.com';
        this.users = `${this.baseURL}/users`;
    }

    async getUserAgrWord(userId: string, wordId: string, token: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/aggregatedWords/${wordId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            switch (response.status) {
                case 401:
                    console.log('Access token is missing or invalid');
                    return null;
                case 404:
                    console.log('Users word not found');
                    return null;
                default:
                    return (await response.json()) as WordData;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default UserArgWords;
