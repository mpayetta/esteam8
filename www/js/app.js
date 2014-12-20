Backbone.View.prototype.close = function () {
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var app = {
	views : {},
	models : {},
	routers : {},
	utils : {},
	services : {},
	config : {},
	session: {},
	Extensions: {}
};

var onDeviceReady = function () {
	FastClick.attach(document.body);
}

document.addEventListener("deviceready", onDeviceReady, false);

$(document).on("ready", function() {
	
	app.session = new app.models.Session();
	app.utils.templates.load(
		[ 
		  "LoginView", 
		  "SignupView", 
		  "HomeView", 
		  
		  "config/ConfigurationView",
		
		  "teams/MyTeamsView", 
		  "teams/CreateTeamView", 
		  "teams/TeamListItemView", 
		  "teams/TeamView",
		  "teams/AddUsersView",
		  
		  "users/UserListItemView"
		], 
		function() {
			app.router = new app.routers.AppRouter();
			app.instance = new app.views.App();
			Backbone.history.start();
		}
	);
	
});