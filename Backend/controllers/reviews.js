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
      content: req.body.content,
      author: req.body.author,
      url: req.body.url,
      media_title: req.body.media_title,
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
});


//get the last review from reviews table
// router.get('/getLastReview', (req, res, next) => {
//   knex.raw("select content from reviews order by id_review desc limit 1")
//     .then((reviews) => {
//       res.send(reviews)
//     })
//     .catch((err) => {
//       res.send(err);
//     })
// });


  module.exports = router;