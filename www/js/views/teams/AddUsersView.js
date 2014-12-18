app.views.AddUsersView = app.Extensions.View.extend({

	initialize: function (options) {
		this.team = options.team;
		this.users = new app.models.UserCollection();
		this.usersToAdd = new app.models.UserCollection();
		this.usersView = new app.views.UserListView({
			collection: this.users,
			navType: "nav-plus",
			cssClass: "to-add",
			listTitle: "Search result"
		});
		this.usersToAddView = new app.views.UserListView({
			collection: this.usersToAdd,
			navType: "nav-remove",
			cssClass: "to-remove",
			listTitle: "Users to add"
		});
		
		this.listenTo(this.users, 'change reset add remove', this.renderUsersList);
		this.listenTo(this.usersToAdd, 'change reset add remove', this.renderUsersToAddList);
	},

	render: function () {
		this.$el.html(this.template({ }));
		this.$('#search-list').html(this.usersView.render().el);
		
		return this;
	},
	
	renderUsersList: function() {
		this.$('#search-list').html(this.usersView.render().el);
	},
	
	renderUsersToAddList: function() {
		this.$('#added-users').html(this.usersToAddView.render().el);
	},

	events: {
		"keyup input#name":		"searchUsers",
		"click a.to-add":		"addUserToList",
		"click a.to-remove": 	"removeUserFromList",
		"click #add-users-btn": "addUsers",
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
		if (this.usersToAdd.get(id)) {
			return;
		}		
		var userToAdd = this.users.get(id);
		this.usersToAdd.add(userToAdd);
	},
	
	removeUserFromList: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data("id");
		this.usersToAdd.remove(id);
	},
	
	addUsers: function() {
		var theTeam = this.team;
		var teamMembers = this.team.get('members');
		this.usersToAdd.each(function(model, index){
			var theUser = model;
			var userTeams = theUser.get('teams');
			userTeams.push(theTeam.id);
			// save the user with the new team in his teams list
			theUser.save({ teams : userTeams });
			// if the team does not have the user already in the members
			// list, then add the user to the team
			if (_.indexOf(theUser.id, teamMembers) === -1) {
				teamMembers.push(theUser.id);
			}
		});
		
		this.team.save({members: teamMembers}, {
			success: function() {
				app.router.navigate("/team/" + theTeam.id, {trigger: true});
			}
		});
		
	},

	goBack: function() {
		app.router.navigate("/team/" + this.team.id, {trigger: true});
	}

});