var express = require('express')
var router = express.Router()
const knex = require('../db.js')


router.get('/getAllReviews', (req, res, next) => {
    knex('*')
      .from('reviews')
      .then((reviews) => {
        res.send(reviews)
      })
      .catch((err) => {
        res.send(err);
      })
  });


  module.exports = router;