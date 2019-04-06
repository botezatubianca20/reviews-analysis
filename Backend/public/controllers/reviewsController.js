const Reviews = require("../models").Reviews;


module.exports.getReviews = (req, res) => {

	Reviews.findAll({
		attributes: ['id_review', 'review', 'author', 'source', 'movie_title', 'sentiment'],
		raw: true
	}).then((result) => {

		res.status(200).send(result);

    }).catch(() => res.status(500).send({message: "Database Error"}));


};


module.exports.createReview = (req,res) => {      
     Reviews.create({
        review: req.body.review,
        author: req.body.author,
        source: req.body.source,
        movie_title: req.body.movie_title,
        sentiment: req.body.sentiment,
        }).then(() => res.status(201).send({message:  "Review created"}))
        
};

module.exports.deleteReview = (req,res) => {

	Reviews.findOne({
		where:{
			/*date: req.body.date,
            start_hour: req.body.start_hour,
            end_hour: req.body.end_hour,*/
            id_review: req.params.id_review,	//will be req.session
		},
		raw: true
	}).then((result) => {

		if(result){
			Reviews.destroy(
        { where: {
            //de completat cu user id dupa ce facem middleware
            id_review:req.params.id_review
                 }
        }).catch(() => res.status(500).send({message: "Review was not deleted"}));

			res.status(200).send({message: "Review was deleted"});
		}
		else{
			res.status(404).send({message: "Review was not found"});
		}

	});
};

module.exports.changeSentiment = (req, res) => {

	Reviews.findOne({
		where: {
            id_review: req.params.id_review
        },
		raw: true
		}).then((result) => {

			if(result){
                let sentiment = result.sentiment;
                Reviews.update(
                    { sentiment: sentiment },
                    { where: {id_review: req.params.id_review}
                    }
                ).catch(() => res.status(500).send({message: "Error"}));

                res.status(200).send({message: "Review sentiment has changed"});

			} else {

				res.status(404).send({message: "Review was not found"});
			}
	}).catch(() => res.status(500).send({message: "Server error"}));

};