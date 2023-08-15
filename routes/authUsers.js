const { Router } = require('express')
const authController = require('../controllers/authController')
const checkReferal = require('../middleware/authMiddleware').checkReferal

const router = Router()


router.get('/signup',authController.sigup_get);
router.post('/signup',checkReferal,authController.sigup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/logout', authController.logout_get)

module.exports = router;