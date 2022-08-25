import { UserData, AuthData } from '../interfaces/interfaces';

class User {
    private baseURL: string;

    private users: string;

    constructor() {
        this.baseURL = 'https://rs-lang-kdz.herokuapp.com';
        this.users = `${this.baseURL}/users`;
    }

    async createNewUser(user: UserData) {
        try {
            const response = await fetch(this.users, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (response.status === 422) {
                console.log('Incorrect e-mail or password');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getUser(userId: string, token: string) {
        try {
            const response = await fetch(`${this.users}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            switch (response.status) {
                case 404:
                    console.log('User not found');
                    return null;
                case 401:
                    console.log('Access token is missing or invalid');
                    return null;
                default:
                    return (await response.json()) as UserData;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async updateUser(userId: string, userNewData: Omit<UserData, 'name'>, token: string) {
        try {
            const response = await fetch(`${this.users}/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(userNewData),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
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

    async deleteUser(userId: string, token: string) {
        try {
            const response = await fetch(`${this.users}/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 401) {
                console.log('Access token is missing or invalid');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getNewUserTokens(userId: string, token: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/tokens`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            switch (response.status) {
                case 403:
                    console.log('Access token is missing or invalid');
                    return null;
                default:
                    return (await response.json()) as AuthData;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default User;
