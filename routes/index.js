const express = require('express')

const router = express.Router();
const homecontroller = require('../controllers/home_controllers')

console.log('router loaded')
 
router.get('/',function(req,res){
    homecontroller.name
    return res.redirect('back');
});

console.log(homecontroller.home)
module.exports = router;

