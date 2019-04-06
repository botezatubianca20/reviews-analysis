var express = require('express')
var router = express.Router()
const knex = require('../db.js')
// const jwt = require('jwt-simple');
// const rfr = require('rfr');
// const hash = require('happn-password-hash-and-salt')

// get all users
router.get('/getUsers', function (req, res, next) {
  knex
    .from('users')
    .select("*")
    .then((users) => {
      res.json(users)
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error in retriving users."
      })
    })
});


// add user
router.post('/addUser', (req, res) => {
  // console.log(req.body)
  knex
    .from('users')
    .insert({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .then(() => {
      res.json({
        success: true,
        message: "Data successfully inserted."
      })
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error. Please try again later."
      })
    })
})

module.exports = router;