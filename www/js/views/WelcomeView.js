app.views.WelcomeView = app.Extensions.View.extend({

	initialize: function (options) {
		this.userId = options.userId;
	},

	render: function () {
		var view = this;
		var user = app.services.UserService.findById(this.userId, function(data) {
			view.$el.html(view.template({user: data}));
			return app.Extensions.View.prototype.render.apply(view, arguments);
		});
	},

	events: {
		
	}
});