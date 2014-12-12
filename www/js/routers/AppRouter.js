app.routers.AppRouter = Backbone.Router.extend({
	
    routes: {
        "":                         "home",
        "login":                    "login",
        "signup":                   "signup"
    },

    initialize: function () {
    },
	
	home: function () {
    	var homeView = new app.views.HomeView();
        app.instance.goTo(homeView);
    },
    
    login: function() {
		var loginView = new app.views.LoginView();
        app.instance.goTo(loginView);
    },
    
    signup: function() {
        var signupView = new app.views.SignupView();
        app.instance.goTo(signupView);
    }

});