app.routers.AppRouter = Backbone.Router.extend({
	
    routes: {
        "":         			 "home",
        "login":    			 "login",
        "signup":   			 "signup",
        "myTeams":				 "myTeams",
        "createTeam":			 "createTeam",
        "team/:teamId":			 "showTeam",
        "team/:teamId/addUsers": "addUsersToTeam"
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
    
    myTeams: function() {
    	var user = new app.models.User({id: app.session.user._id});
    	user.fetch({
    		success: function() {
    			var myTeamsView = new app.views.MyTeamsView({ user: user });
    			app.instance.goTo(myTeamsView);
    		}
    	});
    },
    
    createTeam: function() {
    	var user = new app.models.User({id: app.session.user._id});
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
    },
    
    addUsersToTeam: function(teamId) {
    	var team = new app.models.Team({id: teamId});
    	team.fetch({
    		success: function() {
    			var addUsersView = new app.views.AddUsersView({ team: team });
        		app.instance.goTo(addUsersView);
    		}
    	});
    }

});