var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
process.env.SECRET_KEY = 'secret'


var login = require('../Modules/login')


router.post('/login', function (req, res, next) {
  var userData = {
    email: req.body.email,
    password: req.body.password
  }
  login.getUserLogin(userData, function (error, data) {
    if (error) {
      res.status(501).jsonp({
        "error": error
      })
    } else {

      let token = jwt.sign(data, process.env.SECRET_KEY,{
         expiresIn: 1440
      })

      
      res.jsonp(token)

      //res.status(200).jsonp(data)
    }
  })
})

router.post('/createuser', function (req, res, next) {
  var userData = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }
  login.createUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

router.post('/getdatauser', function (req, res, next) {
  var userData = {
    id: req.body.id
  }
  login.dataUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

module.exports = router;