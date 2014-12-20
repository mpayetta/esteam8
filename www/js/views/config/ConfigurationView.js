app.views.ConfigurationView = app.Extensions.View.extend({

	initialize: function (options) {
	},

	render: function () {
		this.$el.html(this.template());
		return app.Extensions.View.prototype.render.apply(this, arguments);
	},

	events: {
		"click #logout-btn":     "logout"
	},

	logout: function (event) {
		app.session.removeSessionData();
		app.router.navigate("", { trigger: true });
	}	
});