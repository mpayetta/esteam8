app.views.SignupView = Backbone.View.extend({

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	events: {
		"click #create-acc-btn":     "createAccount",
		"click #go-login-btn":       "goToLogin",
		"click #go-home":            "home"
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


		$('div.msg').html('');
		$('div.wheel').addClass('loading');
		$('#create-acc-btn').attr('disabled', true);

		userService.findByName(userData.name, function(data){
			if (data) {
				$('div.msg').html('The username is already being used');
			}
			else {
				userService.findByEmail(userData.email, function(data){
					if (data) {
						$('div.wheel').removeClass('loading');
						$('#create-acc-btn').removeAttr('disabled');
						$('div.msg').html('The email is already being used');
					}
					else {
						userService.createAccount(userData, function(data) {
							if (data.error) {
								$('div.wheel').removeClass('loading');
								$('#create-acc-btn').removeAttr('disabled');
								$('div.msg').html('There was an error while creating your account, please try again');
							}
							else {
								$('div.wheel').removeClass('loading');
								$('#create-acc-btn').removeAttr('disabled');
								app.router.navigate("/login", { trigger: true });
							}
						});
					}
				});
			}
		});
	},

	goToLogin: function (event) {
		app.router.navigate("", { trigger: true });
	},

	home: function (event) {
		app.router.navigate("/", { trigger: true });
	}

});