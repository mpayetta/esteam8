var express = require('express'),
	User = require('../../models/user'),
	password = require('../password');

var router = express.Router(),
    loginRoute = router.route('/');

loginRoute.post(function(req, res) {
	var name = req.body.name,
		pass = req.body.pass;

	User.findOne({ name: name }, function(err, user){
		if (err){
			res.send(err);
		}
		else {
			if (!user) {
				res.json({ error: 'user-not-found' });
			}
			else {
				var hashedPass = user.pass;
				password.validatePassword(pass, hashedPass, function(err, result) {
					if (result) {
						res.json(user);
					} else {					
						res.json({ error: 'invalid-password' });
					}
				});
			}
		}
	});
});

module.exports = router;