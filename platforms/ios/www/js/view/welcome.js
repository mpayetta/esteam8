define(
	[
		'jquery',
		'underscore',
		'backbone',
		'handlebars',
		'text!templates/home/welcome.html'
	], 

	function($, _, Backbone, Handlebars, welcomeViewTemplate) {

		var WelcomeView = Backbone.View.extend({
			el: $('#container'),

			events: {
				
			},

			template: Handlebars.compile(welcomeViewTemplate),
			
			initialize: function(user) {
				this.user = user;
			},
			
			render: function() {
				var data = { name: this.user.name };
				this.$el.html(this.template(data));
			}
		});

		return WelcomeView;
	}
);