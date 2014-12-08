var express = require('express'),
	users = require('./routes/user');

var app = express();

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

app.post('/login', users.login);
app.post('/signup', users.signup);

app.get('/users/:id', users.findById);
app.get('/users/name/:name', users.findByName);
app.get('/users/email/:email', users.findByEmail);
app.get('/users', users.findAll);

app.listen(3000);
console.log('Listening on port 3000...');