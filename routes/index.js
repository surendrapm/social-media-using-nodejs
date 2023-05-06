const express = require('express')

const router = express.Router();
const homecontroller = require('../controllers/home_controllers')

console.log('router loaded')


router.get('/', homecontroller.home);

router.use('/users',require('./users'));
router.use('/posts',require('./post'))
router.use('/comments',require('./comments'))
router.use('/api', require('./api'));
router.use('/likes',require('./likes'))

//for any routes,access from here
//router.use('/routerName',require('./routerFile'));


module.exports = router;


