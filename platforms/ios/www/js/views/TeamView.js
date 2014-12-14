app.views.TeamView = app.Extensions.View.extend( {

	initialize : function(options) {
		this.model = options.team;
		
		this.users = new app.models.UserCollection();
		this.usersView = new app.views.UserListView({
			collection: this.users
		});
		

		this.listenTo(this.users, 'reset', this.render);
		
		if (this.model.get('members').length > 0) {
			this.users.fetch( {
				reset : true,
				data : {
					ids : this.model.get('members')
				}
			});
		}
	},

	render : function(eventName) {
		this.$el.html(this.template( { team : this.model.toJSON() }));
		this.$('#users-list').html(this.usersView.render().el);
		return this;
	}

});
