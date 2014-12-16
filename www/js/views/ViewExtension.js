app.Extensions.View = Backbone.View.extend( {

	initialize : function() {
		this.router = new app.routers.AppRouter();
	},
	
	render : function(options) {

		options = options || {};

		if (options.page === true) {
			this.$el.addClass('page');
		}
		
		return this;

	},

	transitionIn : function(callback) {

		var view = this;

		var transitionIn = function() {
			// TODO: Add transition effect here
			
			view.$el.one('transitionend', function() {
				if (_.isFunction(callback)) {
					callback();
				}
			})
		};

		_.delay(transitionIn, 0);

	},

	transitionOut : function(callback) {

		var view = this;

		// TODO: Add transition effect here
		
		view.$el.one('transitionend', function() {
			if (_.isFunction(callback)) {
				callback();
			}
			;
		});

	},
	
	destroyView: function() {
		this.remove();
		this.unbind();
	}

});