var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	ObjectId = require('mongodb').ObjectID,
	password = require('./password'),
	db,
	users;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
	db = mongoClient.db("pp");
	db.collection('users', {strict:true}, function(err, collection) {
		if (err) {
			console.log("The 'users' collection doesn't exist. Creating it with sample data...");
			populateDB();
		}
		users = db.collection('users');
	});
});

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('findById: ' + id);
	users.findOne({'_id': new ObjectId(id)}, function(err, item) {
		res.send(item);
	});
	
};

exports.findByName = function(req, res) {
	var name = req.params.name;
	console.log('findByName: ' + name);
	users.find({'name': name}).toArray(function(err, items) {
		if (items.length > 0) {
			res.json(items[0]);
		}
		else {
			res.send(null);
		}
	});
};

exports.findByEmail = function(req, res) {
	var email = req.params.email;
	console.log('findByEmail: ' + email);
	users.find({'email': email}).toArray(function(err, items) {
		if (items.length > 0) {
			res.json(items[0]);
		}
		else {
			res.send(null);
		}
	});
};


exports.findAll = function(req, res) {
	var name = req.query["name"];
	if (name) {
		users.find({"name": new RegExp(name, "i")}).toArray(function(err, items) {
			res.json(items);
		});
	} else {
		users.find().toArray(function(err, items) {
			res.json(items);
		});
	}
};

exports.login = function(req, res) {
	var name = req.body['name'];
	var pass = req.body['pass'];
	console.log('login: ' + name + '   ' + pass);
	users.find({ "name": name }).toArray(function(err, items) {
		if (items.length === 0) {
			res.json({ error: 'user-not-found' });
		}
		else {
			var user = items[0];
			console.log(user.pass + '    ' + pass);
			password.validatePassword(pass, user.pass, function(err, result) {
				if (result) {
					res.json(user);
				} else {					
					res.json({ error: 'invalid-password' });
				}
			});
		}
	});
};

exports.signup = function(req, res) {
	var fname = req.body["fname"],
		lname = req.body["lname"],
		username = req.body["name"],
		email = req.body["email"],
		pass = req.body["pass"];
	
	password.saltAndHash(pass, function(hashedPass){
		var result = users.insert({
			"name": username,
			"pass": hashedPass,
			"firstName": fname,
			"lastName": lname,
			"email": email
		}, function(err, inserted){
			if (err) {
				res.json({ error: 'could not insert in collection. error: ' + err });
			}
			else {
				res.json('success');
			}
		});
		
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
	var pass;
	password.saltAndHash("welcome1", function(hash){
		pass = hash;
		console.log("Populating users database...");
		var users = [
			{"name": "mpayetta", "pass": pass, "firstName": "Mauricio", "lastName": "Payetta", "title": "Software Engineer", "department": 	"TTI", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "mauricio@fakemail.com", "city": "Berlin", "pic": "mauricio.jpg"},
			{"name": "pkrootjes", "pass": pass, "firstName": "Peter", "lastName": "Krootjes", "title": "Product Owner", "department": "TTI", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "peter@fakemail.com", "city": "Amsterdam", "pic": "peter.jpg"},
		];

		db.collection('users', function(err, collection) {
			collection.insert(users, {safe:true}, function(err, result) {});
		});
	});

};