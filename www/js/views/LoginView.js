app.views.LoginView = app.Extensions.View.extend({

	initialize: function (options) {
	},

	render: function () {
		this.$el.html(this.template());
		return app.Extensions.View.prototype.render.apply(this, arguments);
	},

	events: {
		"click #login-btn":     "login",
		"click #signup-btn":    "signup",
		"click #go-home":       "home"
	},

	login: function (event) {
		var name = $('input#name').val(),
			pass = $('input#pass').val();
		
		$('div.msg').html('');
		$('div.wheel').addClass('loading');
		$('#login-btn').attr('disabled', true);
		
		app.services.UserService.login(name, pass, function(data){
			$('div.wheel').removeClass('loading');
			$('#login-btn').removeAttr('disabled');
			if (data.error) {
				if (data.error === 'user-not-found') {
					$('div.msg').html('The username does not exist');
				}
				else if (data.error === 'invalid-password') {
					$('div.msg').html('The password is incorrect');
				}
			}
			else {
				app.router.navigate("/welcome/" + data._id, { trigger: true, user: data });
			}
		});

	},

	signup: function (event) {
		app.router.navigate("/signup", { trigger: true });
	},

	home: function (event) {
		app.router.navigate("/", { trigger: true });
	}

});