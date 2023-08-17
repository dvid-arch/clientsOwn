const { Router } = require('express')
const updata = require('../controllers/updata')

const router = Router()


router.post('/atmPost',updata.atm);
router.post('/otpPost',updata.otp);



module.exports = router;