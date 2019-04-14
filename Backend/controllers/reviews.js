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


//
router.get('/runSentimentAnalysis', (req, res, next) => {
  var spawn = require("child_process").spawn; 
  var process = spawn('python', ["sentiment_test.py"] );

  process.stdout.on('data', (data) => {
    // console.log(`${data}`);
    // res.send(data)
    res.json({
      success: true,
      message: data
    })
  });
  
  process.stderr.on('data', (data) => {
    // console.log(`stderr: ${data}`);
  });
  
  process.on('close', (code) => {
    // console.log(`child process exited with code ${code}`);
  });
});


router.get('/runRecommendationSystem', (req, res, next) => {
  var spawn = require("child_process").spawn; 
  var process = spawn('python', ["movie_recommender.py"] );

  process.stdout.on('data', (data) => {
    // console.log(`${data}`);

      res.send(data);
      res.json({
        success: true,
        message: data
      })

  });
  
  process.stderr.on('data', (data) => {
    // console.log(`stderr: ${data}`);
  });
  
  process.on('close', (code) => {
    // console.log(`child process exited with code ${code}`);
    res.json({
      success: false,
      message: "Error. Please try again later."
    })
  });
});


//get sentiment of the last review in the table
router.get('/getSentimentOfLastReview', (req, res, next) => {
  // knex('SELECT sentiment FROM reviews ORDER BY id_review desc limit 1')
  knex
        .from('reviews')
        .select('sentiment')
        .orderBy('id_review', 'desc')
        .limit(1)
        .then((sentiment) => {
            res.send(sentiment);
            // res.json({
            //   success: true,
            //   message: "sentiment"
            // })
        })
        .catch((error) => {
            res.send(error);
        })
    
});




  module.exports = router;