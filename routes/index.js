const express = require('express')

const router = express.Router();
const homecontroller = require('../controllers/home_controllers')

console.log('router loaded')


router.get('/', homecontroller.home);

router.use('/users',require('./users'));
router.use('/users',require('./post'))

//for any routes,access from here
//router.use('/routerName',require('./routerFile'));

console.log(homecontroller.home)
module.exports = router;


