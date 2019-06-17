var express = require('express')
var router = express.Router()
const knex = require('../db.js')


router.get('/getReviews', (req, res) => {
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



router.get('/runSentimentAnalysis', (req, res) => {
  var spawn = require("child_process").spawn; 
  var process = spawn('python', ["sentiment_test.py"] );

  process.stdout.on('data', (data) => {
    res.json({
      success: true,
      message: data
    })
  });
});


router.get('/runRecommendationSystem', (req, res) => {
  var spawn = require("child_process").spawn; 
  var process = spawn('python', ["movie_recommender.py"] );

  process.stdout.on('data', (data) => {
      res.json({
        success: true,
        message: data
      })
  });
});



//get sentiment of the last review in the table
router.get('/getSentimentOfLastReview', (req, res) => {
  knex.raw('SELECT sentiment, procent FROM reviews ORDER BY id_review desc limit 1')
  // knex
  //       .from('reviews')
  //       .select('sentiment')
  //       .orderBy('id_review', 'desc')
  //       .limit(1)
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
router.get('/getRecommendedMovies', (req, res) => {
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
router.get('/getPositiveReviews', (req, res) => {
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

router.get('/getNegativeReviews', (req, res) => {
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

//TO BE DONE:

//get all the reviews from the database for a specific movie with url=""
router.get('/getReviewsAddedByUser/:media_title', (req, res) => {
  knex.raw("SELECT * FROM `reviews` where url='' and media_title='" + req.params.media_title + "'")
        .then((reviews) => {
            res.send(reviews);
        })
        .catch((error) => {
            res.send(error);
        })
});


//delete review by id (this should happen only for reviews added by that user)
router.delete('/deleteReviewAddedByUser/:id_review', (req, res) => {
  knex.raw("delete FROM `reviews` where id_review=" + req.params.id_review)
        .then((reviews) => {
            res.send(reviews);
        })
        .catch((error) => {
            res.send(error);
        })
});


router.get('/getSentimentForSpecificReview/:media_title/:author', (req, res) => {
  knex.raw("SELECT sentiment, procent FROM `reviews` where media_title='" + req.params.media_title + "' and author = '" + req.params.author + "'")
        .then((reviews) => {
            res.send(reviews);
        })
        .catch((error) => {
            res.send(error);
        })
});



//sentiment for a review with a specific id
// router.get('/getSentimentOfReviewById/:id_review', (req, res) => {
//   knex
//         .from('reviews')
//         .select('sentiment')
//         .where('id_review', '=', req.params.id_review)
//         .then((sentiment) => {
//             res.send(sentiment);
//         })
//         .catch((error) => {
//             res.send(error);
//         })
// });


  module.exports = router;