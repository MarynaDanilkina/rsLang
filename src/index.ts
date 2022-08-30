import MainPageControllers from './controllers/main/main';
import Router from './router/router';
import { AuthData } from './interfaces/interfaces';
import './style.sass';
import { saveCurrentUser } from './utils/utils';

const router = new Router();
const mainPageControllers = new MainPageControllers();

const userMemo = localStorage.getItem('authData');
if (userMemo) {
    saveCurrentUser(<AuthData>JSON.parse(userMemo));
}

router.routWindowHandler();
router.routClickHandler();
mainPageControllers.hiddenMenuListner();
