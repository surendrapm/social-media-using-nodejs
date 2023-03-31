const express = require('express')
const router = express.Router()
const passport = require('passport')

const userscontroller = require('../controllers/users_controllers')


router.get('/profile/:id',passport.checkAuthentication,userscontroller.profile)
router.post('/update/:id',passport.checkAuthentication,userscontroller.update)
router.get('/user_profile',userscontroller.signin)

router.get('/user_profile/:id',passport.checkAuthentication,userscontroller.profile)

router.get('/sign-up',userscontroller.signup)
router.get('/sign-in',userscontroller.signin)


router.post('/create',userscontroller.create)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userscontroller.createSession)

router.get('/sign-out',userscontroller.signout)
module.exports = router;