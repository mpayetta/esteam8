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
	
	toggleLoading: function() {
		$('div.wheel').toggleClass('loading');
		if ($('#login-btn').attr('disabled')) {
			$('#login-btn').removeAttr('disabled');
		}
		else {
			$('#login-btn').attr('disabled', true);
		}
	},

	login: function (event) {
		var name = $('input#name').val(),
			pass = $('input#pass').val();
		var view = this;
		
		$('div.msg').html('');
		this.toggleLoading();
		
		var loginPromise = app.services.UserService.login(name, pass);
		
		loginPromise.done(function(data){
			view.toggleLoading();
			app.session.user = data;
			app.router.navigate("/myTeams", { trigger: true });
		});
		
		loginPromise.fail(function(error){
			view.toggleLoading();
			if (error === 'user-not-found') {
				$('div.msg').html('The username does not exist');
			}
			else if (error === 'invalid-password') {
				$('div.msg').html('The password is incorrect');
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