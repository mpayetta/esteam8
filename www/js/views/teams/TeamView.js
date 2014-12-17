app.views.TeamView = app.Extensions.View.extend( {

	initialize : function(options) {
		this.model = options.team;
		
		this.users = new app.models.UserCollection();
		this.usersView = new app.views.UserListView({
			collection: this.users,
			listTitle: "Team members"
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
	
	events: {
		"click #add-users":  	"addUsers",
		"click #go-back":       	"goBack"
	},

	render : function(eventName) {
		this.$el.html(this.template( { team : this.model.toJSON(), currentUser: app.session.user }));
		this.$('#users-list').html(this.usersView.render().el);
		this.$('#users-list a[data-id="' + this.model.get('owner') + '"]').append('<span class="badge badge-primary">owner</span>');
		return this;
	},
	
	goBack: function() {
		app.router.navigate("/myTeams", {trigger: true});
	},
	
	addUsers: function() {
		app.router.navigate("/team/" + this.model.id + "/addUsers", {trigger: true});
	}

});
