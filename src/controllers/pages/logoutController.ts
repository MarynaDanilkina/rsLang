import currentUser from '../../models/currentUser';

export default function logout() {
    currentUser.message = '';
    currentUser.name = '';
    currentUser.refreshToken = '';
    currentUser.token = '';
    currentUser.userId = '';

    localStorage.removeItem('authData');
    location.reload();
}
