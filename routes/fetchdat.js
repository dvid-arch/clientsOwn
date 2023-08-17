const { Router } = require('express')
const fetchController = require('../controllers/fetchController')

const router = Router()


router.post('/getatmdet',fetchController.get_user_details);
// router.post('/getUserDet',fetchController.getUserDet);



module.exports = router;