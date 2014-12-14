var app = {
	views : {},
	models : {},
	routers : {},
	utils : {},
	services : {},
	config : {},
	Extensions: {}
};

document.addEventListener("deviceready", onDeviceReady, false);
var onDeviceReady = function () {
	FastClick.attach(document.body);
}

Backbone.View.prototype.close = function () {
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

$(document).on("ready", function() {
	
	app.router = new app.routers.AppRouter();
	app.utils.templates.load(
		[ "LoginView", "SignupView", "HomeView", "MyTeamsView", "CreateTeamView", "TeamListItemView", "TeamView",
		  "UserListItemView"], 
		function() {
			app.router = new app.routers.AppRouter();
			app.instance = new app.views.App();
			Backbone.history.start();
		}
	);
});