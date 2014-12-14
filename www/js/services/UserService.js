var UserService = {};
app.services.UserService = UserService;

UserService.findById = function(id) {
	var deferred = $.Deferred();
	var url = app.config.dbhost + '/users/' + id;
	$.get(url, function(data){
		deferred.resolve(data);
	});
	return deferred.promise();
}

UserService.findByEmail = function(email) {
	var deferred = $.Deferred();
	var url = app.config.dbhost + '/users/email/' + email;
	$.get(url, function(data){
		deferred.resolve(data);
	});
	return deferred.promise();
}

UserService.findByName = function(name) {
	var deferred = $.Deferred();
	var url = app.config.dbhost + '/users/name/' + name;
	$.get(url, function(data){
		deferred.resolve(data);
	});
	return deferred.promise();
}

UserService.login = function(name, pass, callback) {
	var deferred = $.Deferred();
	var url = app.config.dbhost + '/login';
	$.ajax({
		url: url,
		data: { name: name, pass: pass },
		type: 'POST',
		success: function(data) {
			if (data.error) {
				deferred.reject(data.error);
			}
			else {
				deferred.resolve(data);
			}
		}
	});
	return deferred.promise();
}

UserService.createAccount = function(userData, callback) {
	var url = app.config.dbhost + '/users';
	var deferred = $.Deferred();
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
			if (data.error) {
				deferred.reject(data.error);
			}
			else {
				deferred.resolve(data);
			}
		}
	});
	return deferred.promise();
}


