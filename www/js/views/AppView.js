app.views.App = app.Extensions.View.extend( {

	el : 'body',

	goTo : function(view) {

		var previous = this.currentPage || null;
		var next = view;

		if (previous) {
			previous.transitionOut(function() {
				previous.remove();
			});
		}

		next.render( {
			page : true
		});
		this.$el.append(next.$el);
		next.transitionIn();
		this.currentPage = next;

	}

});