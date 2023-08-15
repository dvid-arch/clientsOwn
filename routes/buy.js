const { Router } = require('express')
const buyController = require('../controllers/buyController')

const router = Router()

router.post('/upWal',buyController.updateWallet);
router.post('/upRefWal',buyController.updateWallet);



module.exports = router;