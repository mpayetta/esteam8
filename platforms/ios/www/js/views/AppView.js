app.views.App = app.Extensions.View.extend( {
	
	initialize: function() {
	},
	
	el : 'body',

	goTo : function(view) {

		var previous = this.currentPage || null;
		var next = view;
		
		if (previous) {
			previous.close();
		}
	
		next.render();
		this.$el.html(next.$el);
			
		this.currentPage = next;

	}

});