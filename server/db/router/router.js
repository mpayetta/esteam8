module.exports = function (app) {
	app.use('/login', require('./routes/login.js'));
    app.use('/users', require('./routes/users.js'));
    app.use('/teams', require('./routes/teams.js'));
};