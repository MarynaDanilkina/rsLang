import State from './models/state';
import Router from './router/router';
import './style.sass';

const router = new Router();

router.routWindowHandler();
router.routClickHandler();

window.addEventListener('unload', () => {
    window.localStorage.setItem(State.currentUserID, JSON.stringify(State));
});
if (window.localStorage.getItem('')) {
    const storageState = JSON.parse(<string>window.localStorage.getItem(''));
}
