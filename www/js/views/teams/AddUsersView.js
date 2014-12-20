app.views.AddUsersView = app.Extensions.View.extend({

	initialize: function (options) {
		this.team = options.team;
		this.users = new app.models.UserCollection();
		this.teamMembers = new app.models.UserCollection();
		this.usersView = new app.views.UserListView({
			collection: this.users,
			navType: "nav-plus",
			cssClass: "to-add",
			listTitle: "Search result"
		});
		this.teamMembersView = new app.views.UserListView({
			collection: this.teamMembers,
			navType: "nav-remove",
			cssClass: "to-remove",
			listTitle: "Team Members"
		});
		
		this.listenTo(this.users, 'change reset add remove', this.renderUsersList);
		this.listenTo(this.teamMembers, 'change reset add remove', this.renderTeamMembersList);
	},

	render: function () {
		this.$el.html(this.template({ }));
		this.$('#search-list').html(this.usersView.render().el);
		
		this.teamMembers.fetch( {
			reset : true,
			data : {
				ids : this.team.get('members')
			}
		});
		
		return this;
	},
	
	renderUsersList: function() {
		this.users.remove(this.teamMembers.models);
		this.$('#search-list').html(this.usersView.render().el);
	},
	
	renderTeamMembersList: function() {
		this.$('#added-users').html(this.teamMembersView.render().el);
	},

	events: {
		"keyup input#name":		"searchUsers",
		"click a.to-add":		"addUserToList",
		"click a.to-remove": 	"removeUserFromList",
		"click #add-users-btn": "saveTeam",
		"click #go-back":       "goBack"
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
		if ($('input#name').val().length === 0) {
			return;
		}
		this.users.fetch( {
			reset : true,
			data : {
				name : $('input#name').val()
			}
		});
	},
	
	addUserToList: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data("id");
		if (this.teamMembers.get(id)) {
			return;
		}		
		var userToAdd = this.users.get(id);
		this.users.remove(id);
		this.teamMembers.add(userToAdd);
	},
	
	removeUserFromList: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data("id");
		this.users.add(this.teamMembers.get(id));
		this.teamMembers.remove(id);
	},
	
	saveTeam: function() {
		var theTeam = this.team;
		var oldMembers = this.team.get('members');
		var newMembers = this.teamMembers;
		var newMembersIds = [];
		newMembers.each(function(user, index){
			newMembersIds.push(user.id);
			var userTeams = user.get('teams');
			
			// if new user wasn't in old team members before, add team to user teams
			if (! _.contains(oldMembers, user.id)) {
				userTeams.push(theTeam.id);
				// save the user with the new teams list
				user.save({ teams : userTeams });
			} 
		});
		
		_.each(oldMembers, function(userId, index){
			var user = new app.models.User({ id: userId });
			// if old member is not in new list, then remove team from user teams
			if (!newMembers.get(userId)) {
				user.fetch({
					success: function(user) {
						var userTeams = user.get('teams');
						userTeams = _.without(userTeams, theTeam.id);
						user.save({ teams : userTeams });
					}
				});
			}
			
		});
		
		
		
		this.team.save({members: newMembersIds}, {
			success: function() {
				app.router.navigate("/team/" + theTeam.id, {trigger: true});
			}
		});
		
	},

	goBack: function() {
		app.router.navigate("/team/" + this.team.id, {trigger: true});
	}

});