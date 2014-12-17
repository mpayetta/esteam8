var express = require('express'),
	password = require('../password'),
	Team = require('../../models/team');

var router = express.Router();

var teamsRoute = router.route('/');

// Create team endpoint
teamsRoute.post(function(req, res) {
	var team = new Team();
	console.log(req.params);
	team.name = req.body.name;
	team.owner = req.body.owner;
	team.members = req.body.members;

	team.save(function(err) {
		if (err) {
			res.json({ error: 'could not insert in collection. error: ' + err });
		}
		res.json(team);
	});
});

// Get all teams, if query param "ids" is present, will get only the teams
// with the given ids
teamsRoute.get(function(req, res) {	
	console.log("get all teams q: " + req.query.ids);
	if (req.query.ids) {
		Team.find( { '_id': { $in: req.query.ids } }, 
			function(err, teams){
				if (err) {
					res.send(err);
				}
				console.log(teams);
				res.json(teams);
			}
		);
	}
	else {
		Team.find(function(err, teams) {
			if (err) {
				res.send(err);
			}
			console.log(teams);
			res.json(teams);
		});
	}
});


// Route for single team operations
var teamRoute = router.route('/:team_id');

// Get team by ID
teamRoute.get(function(req, res) {
	Team.findById(req.params.team_id, function(err, team) {
		if (err) {
			res.send(err);
		}
		res.json(team);
	});
});

// Update team data
teamRoute.put(function(req, res) {
	Team.findById(req.params.team_id, function(err, team) {
		if (err) {
			res.send(err);
		}

		team.name = req.body.name;
		team.owner = req.body.owner;
		team.members = req.body.members;

		team.save(function(err) {
			if (err) {
				res.send(err);
			}	
			res.json(team);
		});
	});
});

// Delete a team by ID
teamRoute.delete(function(req, res) {
	Team.findByIdAndRemove(req.params.team_id, function(err) {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'team removed from the locker!' });
	});
});


var byNameRoute = router.route('/name/:team_name');

// Get team by name
byNameRoute.get(function(req, res) {
	Team.findOne({ name: req.params.team_name }, function(err, team) {
		if (err) {
			res.send(err);
		}
		res.json(team);
	});
});

module.exports = router;