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
				dataType: 'jsonp',
				success: function(data) {
					callback(data);
				}
			});
		}
		
		return UserService;
	}
);

