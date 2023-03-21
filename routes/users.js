const express = require('express')

const router = express.Router()
const userscontroller = require('../controllers/users_controllers')
const passport = require('passport')

router.get('/profile',passport.checkAuthentication,userscontroller.profile)

router.get('/sign-up',userscontroller.signup)
router.get('/sign-in',userscontroller.signin)


router.post('/create',userscontroller.create)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'./users/sign-in'}
),userscontroller.createSession)

router.get('/sign-out',userscontroller.signout)
module.exports = router;