import MainPageControllers from './controllers/main/main';
import Router from './router/router';
import './style.sass';

const router = new Router();
const mainPageControllers = new MainPageControllers();

router.routWindowHandler();
router.routClickHandler();
mainPageControllers.hiddenMenuListner();
