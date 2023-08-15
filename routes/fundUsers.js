const { Router } = require('express')
const fundController = require('../controllers/fundController')

const router = Router()

router.post('/recharge',fundController.recharge_post);
router.post('/transfer',fundController.transfer_post);
router.post('/man',fundController.up_amt)


module.exports = router;