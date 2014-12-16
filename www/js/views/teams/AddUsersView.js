app.views.AddUsersView = app.Extensions.View.extend({

	initialize: function (options) {
		this.team = options.team;
		this.users = new app.models.UserCollection();
		this.usersView = new app.views.UserListView({
			collection: this.users
		});
		
		this.listenTo(this.users, 'reset', this.renderUsersList);
	},

	render: function () {
		this.$el.html(this.template({ }));
		this.$('#search-list').html(this.usersView.render().el);
		
		return this;
	},
	
	renderUsersList: function() {
		this.$('#search-list').html(this.usersView.render().el);
	},

	events: {
		"click #search-users-btn":	"searchUsers",
		"click #add-users-btn":  	"addUsers",
		"click #go-back":       	"goBack"
	},
	
	toggleLoading: function() {
		$('div.wheel').toggleClass('loading');
		if ($('#search-users-btn').attr('disabled')) {
			$('#search-users-btn').removeAttr('disabled');
		}
		else {
			$('#create-team-btn').attr('disabled', true);
		}
	},
	
	searchUsers: function() {
		this.users.fetch( {
			reset : true,
			data : {
				name : $('input#name').val()
			}
		});
	},

	goBack: function() {
		app.router.navigate("/showTeam/" + this.team.id, {trigger: true});
	}

});