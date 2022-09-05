import MainPageControllers from './controllers/main/main';
import State from './models/state';
import Router from './router/router';
import { AuthData, StateType } from './interfaces/interfaces';
import './style.sass';
import { saveCurrentUser } from './utils/utils';
import Theme from './views/components/header/theme';

const router = new Router();
const mainPageControllers = new MainPageControllers();
const theme = new Theme();

const userMemo = localStorage.getItem('authData');
if (userMemo) {
    saveCurrentUser(<AuthData>JSON.parse(userMemo));
}

if (window.localStorage.getItem(State.currentUserID)) {
    State.theme = (JSON.parse(window.localStorage.getItem(State.currentUserID) as string) as StateType).theme;
}

router.routWindowHandler();

mainPageControllers.hiddenMenuListner();
theme.updateTheme();

window.addEventListener('unload', () => {
    window.localStorage.setItem(State.currentUserID, JSON.stringify(State));
});
