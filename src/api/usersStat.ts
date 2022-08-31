import { StatisticsData } from '../interfaces/interfaces';

class UserStat {
    private baseURL: string;

    private users: string;

    constructor() {
        this.baseURL = 'https://rs-lang-kdz.herokuapp.com';
        this.users = `${this.baseURL}/users`;
    }

    async getStatistics(userId: string, token: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/statistics`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            switch (response.status) {
                case 401:
                    console.log('Access token is missing or invalid');
                    return null;
                case 404:
                    console.log('Statistics not found');
                    return null;
                default:
                    return (await response.json()) as StatisticsData;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async upsertStatistics(userId: string, statistics: StatisticsData, token: string) {
        try {
            const response = await fetch(`${this.users}/${userId}/statistics`, {
                method: 'PUT',
                body: JSON.stringify(statistics),
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
}

export default UserStat;
