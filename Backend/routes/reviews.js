let express = require('express');
let router = express.Router();
let reviewsController = require('../public/controllers/reviewsController');

router.get('/getReviews', reviewsController.getReviews);
router.post('/createReview', reviewsController.createReview);
router.put('/deleteReview/:id_review', reviewsController.deleteReview);
router.post('/changeSentiment/:id_review', reviewsController.changeSentiment);


module.exports = router;