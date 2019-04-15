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
    res.json({
      success: false,
      message: "Error. Please try again later."
    })
  });
});


router.get('/runRecommendationSystem', (req, res, next) => {
  var spawn = require("child_process").spawn; 
  var process = spawn('python', ["movie_recommender.py"] );

  process.stdout.on('data', (data) => {
    // console.log(`${data}`);

      // res.send(data);
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
        })
        .catch((error) => {
            res.send(error);
        })
});

router.post('/postMovieForRecommendation', (req, res) => {
  knex
    .from('movie')
    .insert({
      movie: req.body.movie
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

//get the  recommended_movies from the last id_movie
router.get('/getRecommendedMovies', (req, res, next) => {
  knex
        .from('movie')
        .select('recommended_movies')
        .orderBy('id_movie', 'desc')
        .limit(1)
        .then((mov) => {
            res.send(mov);
        })
        .catch((error) => {
            res.send(error);
        })
});



//vreau sa imi ia random 3 review-uri pozitive si 3 negative in fiecare zi la ora 12:00
//momentan fac cu primele 3 din baza de date
router.get('/getPositiveReviews', (req, res, next) => {
  knex
        .from('reviews')
        .select('content')
        .where('sentiment', '=', '1')
        .orderBy('id_review', 'desc')
        .limit(3)
        .then((sentiment) => {
            res.send(sentiment);
        })
        .catch((error) => {
            res.send(error);
        })
});

router.get('/getNegativeReviews', (req, res, next) => {
  knex
        .from('reviews')
        .select('content')
        .where('sentiment', '=', '-1')
        .orderBy('id_review', 'desc')
        .limit(3)
        .then((sentiment) => {
            res.send(sentiment);
        })
        .catch((error) => {
            res.send(error);
        })
});


  module.exports = router;