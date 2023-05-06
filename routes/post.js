const express = require('express')
const router = express.Router()
const passport = require('passport')

const postcontroller = require('../controllers/post_controller')

router.post('/create',passport.checkAuthentication,postcontroller.create)
router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy)
module.exports = router;    