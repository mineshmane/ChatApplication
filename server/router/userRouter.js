

var express = require('express');
var userCtrl = require('../controller/userControl');

var router = express.Router();

var verify = require('../middleware/tokenVerify')
//login API
router.post('/login', userCtrl.login);

//registeration API
router.post('/register', userCtrl.register);



//forget password API
router.post('/forget', userCtrl.forgetPassword);

console.log("in router");

router.post('/reset', verify.checkToken, userCtrl.reset);


//API to add message into the database

module.exports = router;