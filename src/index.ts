import MainPageControllers from './controllers/main/main';
import State from './models/state';
import Router from './router/router';
import './style.sass';

const router = new Router();
const mainPageControllers = new MainPageControllers();

router.routWindowHandler();
router.routClickHandler();
mainPageControllers.hiddenMenuListner();

window.addEventListener('unload', () => {
    window.localStorage.setItem(State.currentUserID, JSON.stringify(State));
});
if (window.localStorage.getItem('')) {
    const storageState = JSON.parse(<string>window.localStorage.getItem(''));
}
