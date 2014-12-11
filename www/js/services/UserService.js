var UserService = {};
app.services.UserService = UserService;

UserService.findById = function(id, callback) {
	var url = app.config.dbhost + '/users/' + id;
	$.get(url, function(data){
		callback(data);
	});
}

UserService.findByEmail = function(email, callback) {
	var url = app.config.dbhost + '/users/email/' + email;
	$.get(url, function(data){
		callback(data);
	});
}

UserService.findByName = function(name, callback) {
	var url = app.config.dbhost + '/users/name/' + name;
	$.get(url, function(data){
		callback(data);
	});
}

UserService.login = function(name, pass, callback) {
	var url = app.config.dbhost + '/login';
	$.ajax({
		url: url,
		data: { name: name, pass: pass },
		type: 'POST',
		success: function(data) {
			callback(data);
		}
	});
}

UserService.createAccount = function(userData, callback) {
	var url = app.config.dbhost + '/signup';
	var data = {
		fname: userData.fname,
		lname: userData.lname,
		name: userData.name,
		email: userData.email,
		pass: userData.pass				
	};
	$.ajax({
		url: url,
		data: data,
		type: 'POST',
		success: function(data){
			callback(data);
		}
	});
}


