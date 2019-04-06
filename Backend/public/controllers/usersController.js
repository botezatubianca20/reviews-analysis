const Users = require("../models").Users;

//get all users
module.exports.getUsers = (req, res) => {
	Users.findAll({
		attributes: ['id', 'firstname', 'lastname', 'email', 'username'],
		raw: true
	}).then((result) => {
		res.status(200).send(result);
	}).catch(() => res.status(500).send({message: "Database Error"}));
};

//post user
module.exports.createUser = (req,res) => {
    Users.findOne({
        where: {
            email: req.body.email
        },
        raw: true
    }).then((result) => {
        if (result) {
            res.status(302).send({message: "Email already registered"});
        }
        else {
            
            Users.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
				password: req.body.password,
            }).then(() => res.status(201).send({message:  "User created!"}))
        }
    });
};

//get one user
module.exports.getOneUser = (req, res) => {
	Users.findOne({
		attributes: ['id', 'firstname', 'lastname', 'email', 'username'],
		where: {
			email: req.params.email
		},
		raw:true
	}).then((result) => {

		if(result){
			res.status(200).send(result);
		} else {
			res.status(404).send({message:"User not found!"});
		}
	})
};

//update user
module.exports.updateUser = (req, res) => {
	Users.findOne({
		where: {
            email:req.params.email
        },
		raw: true
		}).then((result) => {

			if(result){
                Users.update(
                    { firstname: req.body.firstname,
						lastname: req.body.lastname,
						email: req.body.email,
                        username: req.body.username,
                        password: req.body.password },
                    { where: {
							email:req.params.email
                    		 }
                    }
                ).catch(() => res.status(500).send({message: "Error"}));

                res.status(200).send({message: "Users data has changed"});

			} else {

				res.status(404).send({message: "Users was not found"});
			}
	}).catch(() => res.status(500).send({message: "Server error"}));

};