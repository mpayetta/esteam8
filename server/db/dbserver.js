var express = require('express'),
	users = require('./routes/user');

var app = express();

app.get('/users/:id', users.findById);
app.get('/users/name/:name', users.findByName);
app.get('/users/email/:email', users.findByEmail);
app.get('/users', users.findAll);

app.get('/login', users.login);

app.listen(3000);
console.log('Listening on port 3000...');