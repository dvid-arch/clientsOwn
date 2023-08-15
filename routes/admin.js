const { Router } = require('express')
const adminCon = require('../controllers/adminCon')
const router = Router()


router.post('/adminup',adminCon.admin_post);

module.exports = router