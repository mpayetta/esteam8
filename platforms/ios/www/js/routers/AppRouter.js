app.routers.AppRouter = Backbone.Router.extend({
	
    routes: {
        "":         			"home",
        "login":    			"login",
        "signup":   			"signup",
        "welcome/:userId":		"welcome",
        "createTeam/:userId":	"createTeam",
        "showTeam/:teamId":		"showTeam"
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
    },
    
    welcome: function(userId) {
    	var user = new app.models.User({id: userId});
    	user.fetch({
    		success: function() {
    			var myTeamsView = new app.views.MyTeamsView({ user: user });
    			app.instance.goTo(myTeamsView);
    		}
    	});
    },
    
    createTeam: function(userId) {
    	var user = new app.models.User({id: userId});
    	user.fetch({
    		success: function() {
    			var createTeamView = new app.views.CreateTeamView({ user: user });
        		app.instance.goTo(createTeamView);
    		}
    	});
    },
    
    showTeam: function(teamId) {
    	var team = new app.models.Team({id: teamId});
    	team.fetch({
    		success: function() {
    			var showTeamView = new app.views.TeamView({ team: team });
        		app.instance.goTo(showTeamView);
    		}
    	});
    }

});