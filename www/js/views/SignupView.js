app.views.SignupView = app.Extensions.View.extend({

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return app.Extensions.View.prototype.render.apply(this, arguments);
	},

	events: {
		"click #create-acc-btn":     "createAccount",
		"click #go-login-btn":       "goToLogin",
		"click #go-home":            "home"
	},
	
	toggleLoading: function() {
		$('div.wheel').toggleClass('loading');
		if ($('#login-btn').attr('disabled')) {
			$('#login-btn').removeAttr('disabled');
		}
		else {
			$('#login-btn').attr('disabled', true);
		}
	},

	createAccount: function (event) {
		var userData = {
			fname: $('input#fname').val(),
			lname: $('input#lname').val(),
			email: $('input#email').val(),
			name: $('input#name').val(),
			pass: $('input#pass').val()
		};
		var userService = app.services.UserService;
		var view = this;

		$('div.msg').html('');
		this.toggleLoading();
		
		var user = new app.models.User();
		user.fetchByName(userData.name, {
			success: function(data) {
				if (data.id) {
					view.toggleLoading();
					$('div.msg').html('The username is already being used');
				}
				else {
					user.fetchByEmail(userData.email, {
						success: function(data) {
							if (data.id) {
								view.toggleLoading();
								$('div.msg').html('The email is already being used');
							}
							else {
								user.save(userData, {
									success: function(data) {
										view.toggleLoading();
										view.goToLogin();
									},
									error: function() {
										view.toggleLoading();
										$('div.msg').html('There was an error while creating your account, please try again');
									}
								});
							}
						}
					});
				}
			}
		});
		
//		var namePromise = userService.findByName(userData.name);
//		namePromise.done(function(data) {
//			if (data) {
//				view.toggleLoading();
//				$('div.msg').html('The username is already being used');
//			}
//			else {
//				var emailPromise = userService.findByEmail(userData.email);
//				emailPromise.done(function(data){
//					if (data) {
//						view.toggleLoading();
//						$('div.msg').html('The email is already being used');
//					}
//					else {
//						var createAccPromise = userService.createAccount(userData);
//						createAccPromise.done(function(data){
//							view.toggleLoading();
//							view.goToLogin();
//						});
//						
//						createAccPromise.fail(function(error) {
//							view.toggleLoading();
//							$('div.msg').html('There was an error while creating your account, please try again');
//						});
//					}
//				})
//			}
//		});
	},

	goToLogin: function (event) {
		app.router.navigate("/login", { trigger: true });
	},

	home: function (event) {
		app.router.navigate("/", { trigger: true });
	}

});