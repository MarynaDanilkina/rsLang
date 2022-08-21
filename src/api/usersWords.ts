import { UserWordData } from '../interfaces/interfaces';

class UserWords {
    private baseURL: string;

    private users: string;

    constructor() {
        this.baseURL = 'https://rs-lang-kdz.herokuapp.com';
        this.users = `${this.baseURL}/users`;
    }

    async getAllUserWords(userId: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/words`);
            switch (response.status) {
                case 402:
                    console.log('Access token is missing or invalid');
                    return null;
                default:
                    return (await response.json()) as Array<UserWordData>;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getUserWord(userId: string, wordId: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/words/${wordId}`);
            switch (response.status) {
                case 401:
                    console.log('Access token is missing or invalid');
                    return null;
                case 404:
                    console.log('Users word not found');
                    return null;
                default:
                    return (await response.json()) as UserWordData;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async createUserWord(userId: string, wordId: string, userWord: UserWordData) {
        try {
            const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
                method: 'POST',
                body: JSON.stringify(userWord),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            switch (response.status) {
                case 400:
                    console.log('Bad request');
                    break;
                case 401:
                    console.log('Access token is missing or invalid');
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }

    async updateUserWord(userId: string, wordId: string, userWord: UserWordData) {
        try {
            const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
                method: 'PUT',
                body: JSON.stringify(userWord),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            switch (response.status) {
                case 400:
                    console.log('Bad request');
                    break;
                case 401:
                    console.log('Access token is missing or invalid');
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteUser(userId: string, wordId: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/words/${wordId}`, { method: 'DELETE' });
            if (response.status === 401) {
                console.log('Access token is missing or invalid');
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export default UserWords;
