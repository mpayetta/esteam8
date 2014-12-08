define([
    'jquery',
    'underscore',
    'backbone',
    'view/login',
    'view/signup'
], function($, _, Backbone, LoginView, SignupView, HomeView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'login': 'showLogin',
            'signup': 'showSignup',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function() {
        var app_router = new AppRouter();
		
        app_router.on('route:showLogin', function(){
            var loginView = new LoginView();
            loginView.render();
        });
        
        
        app_router.on('route:showSignup', function(){
            var showSignupView = new SignupView();
            showSignupView.render();
        });
        
    
        app_router.on('route:defaultAction', function(actions){
			var loginView = new LoginView();
			loginView.render();
        });
        		
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});