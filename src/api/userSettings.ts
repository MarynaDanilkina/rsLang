import { SettingsData } from '../interfaces/interfaces';

class UserSettings {
    private baseURL: string;

    private users: string;

    constructor() {
        this.baseURL = 'https://rs-lang-kdz.herokuapp.com';
        this.users = `${this.baseURL}/users`;
    }

    async getSettings(userId: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/settings`);
            switch (response.status) {
                case 401:
                    console.log('Access token is missing or invalid');
                    return null;
                case 404:
                    console.log('Settings not found');
                    return null;
                default:
                    return (await response.json()) as SettingsData;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async upsertSettings(userId: string, settings: SettingsData) {
        try {
            const response = await fetch(`${this.users}/${userId}/settings}`, {
                method: 'PUT',
                body: JSON.stringify(settings),
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
}

export default UserSettings;
