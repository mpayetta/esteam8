var app = {
	views : {},
	models : {},
	routers : {},
	utils : {},
	services : {},
	config : {},
	Extensions: {}
};

$(document).on("ready", function() {
	app.router = new app.routers.AppRouter();
	app.utils.templates.load(
		[ "LoginView", "SignupView", "HomeView", "WelcomeView" ], 
		function() {
			app.router = new app.routers.AppRouter();
			app.instance = new app.views.App();
			Backbone.history.start();
		}
	);
});