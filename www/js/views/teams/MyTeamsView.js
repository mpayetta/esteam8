app.views.MyTeamsView = app.Extensions.View.extend( {
	
	className: 'page',
	
	initialize : function(options) {
		this.user = options.user;
		this.teams = new app.models.TeamCollection();
		this.teamsView = new app.views.TeamListView({
			collection: this.teams
		});
		

		this.listenTo(this.teams, 'reset', this.render);
		
		if (this.user.get('teams').length > 0) {
			this.teams.fetch( {
				reset : true,
				data : {
					ids : this.user.get('teams')
				}
			});
		}
	},

	render : function() {
		this.$el.html(this.template( { user : this.user.toJSON() }));
		this.$('#teams-list').html(this.teamsView.render().el);
		return this;
	},

	events : {
		'click #go-back':			'goBack',
		'click #create-team' : 		'createTeam',
		'click .teams-table a': 	'goToTeam'
	},
	
	goBack: function() {
		app.router.navigate("/myTeams", {trigger: true});
	},

	createTeam : function(event) {
		app.router.navigate("/createTeam", {
			trigger : true
		});
	},
	
	goToTeam: function(event) {
    	event.preventDefault();
		var id = $(event.currentTarget).data("id");
		app.router.navigate("/showTeam/" + id, {
			trigger : true
		});
	}
});