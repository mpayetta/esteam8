var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/pp');

//Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); 

// Allow cross origin
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
	if (req.method === 'OPTIONS') {
		res.statusCode = 204;
		return res.end();
	} else {
		return next();
	}
});


//Use environment defined port or 3000
var port = process.env.PORT || 3000;

var router = require('./router/router')(app);


// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);