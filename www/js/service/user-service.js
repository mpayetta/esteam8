define(
	[
		'jquery',
		'config'
	], 

	function($, Config) {
		var UserService = {};

		UserService.findById = function(id, callback) {
			var url = Config.dbhost + '/users/' + id;
			$.get(url, function(data){
				callback(data);
			});
		}
		
		UserService.login = function(name, pass, callback) {
			var url = Config.dbhost + '/login';
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
			var url = Config.dbhost + '/signup';
			var data = {
				fname: userData.fname,
				lname: userData.lname,
				username: userData.username,
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
		
		return UserService;
	}
);

