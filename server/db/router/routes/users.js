var express = require('express'),
	password = require('../password'),
	User = require('../../models/user');

var router = express.Router();

var usersRoute = router.route('/');

// Create user endpoint
usersRoute.post(function(req, res) {
	var user = new User();
	
	user.name = req.body.name;
	user.fname = req.body.fname;
	user.lname = req.body.lname;
	user.email = req.body.email;
	user.pass = password.saltAndHash(req.body.pass);
	user.teams = [];

	user.save(function(err) {
		if (err) {
			res.json({ error: 'could not insert in collection. error: ' + err });
		}
		res.json(user);
	});
});

// Get all users
usersRoute.get(function(req, res) {
	if (req.query.ids) {
		User.find( { '_id': { $in: req.query.ids } }, 
			function(err, users){
				if (err) {
					res.send(err);
				}
				console.log(users);
				res.json(users);
			}
		);
	}
	else {
		User.find(function(err, users) {
			if (err) {
				res.send(err);
			}
			console.log(users);
			res.json(users);
		});
	}
});


// Route for single user operations
var userRoute = router.route('/:user_id');

// Get user by ID
userRoute.get(function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

// Update user data
userRoute.put(function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(err);
		}
		console.log('updating user');
		user.fname = req.body.fname;
		user.lname = req.body.lname;
		user.teams = req.body.teams;

		user.save(function(err) {
			if (err) {
				res.send(err);
			}	
			res.json(user);
		});
	});
});

// Delete a user by ID
userRoute.delete(function(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err) {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'User removed from the locker!' });
	});
});


var byNameRoute = router.route('/name/:user_name');

// Get user by name
byNameRoute.get(function(req, res) {
	User.findOne({ name: req.params.user_name }, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});


var byEmailRoute = router.route('/email/:user_email');

// Get user by email
byEmailRoute.get(function(req, res) {
	User.findOne({ name: req.params.user_email }, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});


module.exports = router;