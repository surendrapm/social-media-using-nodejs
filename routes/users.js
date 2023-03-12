const express = require('express')

const router = express.Router()
const userscontroller = require('../controllers/users_controllers')


router.get('/profile',userscontroller.profile)

router.get('/sign-up',userscontroller.signup)
router.get('/sign-in',userscontroller.signin)
router.get('/sign-out',userscontroller.signout)

router.post('/create',userscontroller.create)
router.post('/create-session',userscontroller.createSession)
module.exports = router;