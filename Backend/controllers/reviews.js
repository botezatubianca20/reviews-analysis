var express = require('express')
var router = express.Router()
const knex = require('../db.js')


router.get('/getReviews', (req, res, next) => {
    knex('*')
      .from('reviews')
      .then((reviews) => {
        res.send(reviews)
      })
      .catch((err) => {
        res.send(err);
      })
  });

  // add review
router.post('/addReview', (req, res) => {
  knex
    .from('reviews')
    .insert({
      review: req.body.review,
      author: req.body.author,
      source: req.body.source,
      movie_title: req.body.movie_title,
      sentiment: req.body.sentiment,
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