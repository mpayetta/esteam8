app.models.Session = Backbone.Model.extend({ 
	
	saveSessionData: function(data) {
		window.localStorage.setItem("userId", data._id);
		window.localStorage.setItem("username", data.name);
	},
	
	removeSessionData: function() {
		window.localStorage.removeItem("userId");
		window.localStorage.removeItem("username");
	},
	
	getSessionData: function() {
		if (window.localStorage.getItem("userId")) {
			var sessionData = {};
			sessionData.userId = window.localStorage.getItem("userId");
			sessionData.username = window.localStorage.getItem("username");
			return sessionData;
		}
		return null;
	}
	
});