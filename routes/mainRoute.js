const {Router} = require('express');
const { requireToken } = require('../middlewares/auth');
const mainController = require('../controllers/mainController');

const router = Router();

router.get('/', requireToken, mainController.getMainPage);

router.post('/register', mainController.postRegisterUser);

router.get('/login', mainController.getLoginPage);

router.post('/login', mainController.postLoginUser);

router.get('/logout', mainController.getLogoutUser);

module.exports = router;