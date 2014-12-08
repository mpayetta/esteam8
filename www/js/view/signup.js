define(
	[
		'jquery',
		'backbone',
		'handlebars',
		'view/login',
		'services/user-service',
		'text!templates/home/signup.html'
	], 

	function($, Backbone, Handlebars, LoginView, UserService, signupViewTemplate) {

		var SignupView = Backbone.View.extend({
			el: $('#container'),
			
			events: {
				'click a#create-account': 'createAccount'
			},
			
			template: Handlebars.compile(signupViewTemplate),
			
			render: function() {
				this.$el.html(this.template({}));
			},
			
			createAccount: function() {
				var userData = {
					fname: $('input#fname').val(),
					lname: $('input#lname').val(),
					username: $('input#username').val(),
					email: $('input#email').val(),
					pass: $('input#password').val()
				};
				UserService.createAccount(userData, function(result) {
					if (result.error) {
						$('div.error').html('There was an error while creating the account');
					}
					else {
						window.location.hash = '#/login';
					}
				});
				
			}
			
		});

		return SignupView;
	}
);