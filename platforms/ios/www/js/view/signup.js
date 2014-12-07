define(
	[
		'jquery',
		'underscore',
		'backbone',
		'handlebars',
		'text!templates/home/signup.html'
	], 

	function($, _, Backbone, Handlebars, signupViewTemplate) {

		var SignupView = Backbone.View.extend({
			el: $('#container'),
			template: Handlebars.compile(signupViewTemplate),
			render: function() {
				var data = { title: 'Signup' };
				this.$el.html(this.template(data));
			}
		});

		return SignupView;
	}
);