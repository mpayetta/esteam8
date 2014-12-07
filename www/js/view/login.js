define(
    [
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
	'view/welcome',
	'services/user-service',
    'text!templates/home/login.html'
    ], 
    
    function($, _, Backbone, Handlebars, WelcomeView, UserService, loginViewTemplate) {
    
        var LoginView = Backbone.View.extend({
            el: $('#container'),
			
			events: {
				'click input#login': 'login'
			},
			
            template: Handlebars.compile(loginViewTemplate),
            
			render: function() {
                var data = {};
				this.$el.html(this.template(data));
            },
	
			login: function() {
				$('div.error').html('');
				var name = $('input#name').val();
				var pass = $('input#pass').val();
				UserService.login(name, pass, function(data) {
					// Login error
					if (data.error) {
						if (data.error === 'user-not-found') {
							$('div.error').html('Invalid username');
						}
						else if (data.error === 'invalid-password') {
							$('div.error').html('Username and password do not match');
						}
					}
					// Successfully logged in
					else {
						var welcomeView = new WelcomeView();
						welcomeView.initialize(data);
						welcomeView.render();
					}
				});
			}
        });

        return LoginView;
    }
);