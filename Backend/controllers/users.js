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

module.exports = router;