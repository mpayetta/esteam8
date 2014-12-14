app.views.CreateTeamView = app.Extensions.View.extend({

	initialize: function (options) {
		this.user = options.user;
	},

	render: function () {
		this.$el.html(this.template({user: this.user.toJSON()}));
		return app.Extensions.View.prototype.render.apply(this, arguments);
	},

	events: {
		"click #create-team-btn":  	"createTeam",
		"click #go-back":       	"goBack"
	},
	
	toggleLoading: function() {
		$('div.wheel').toggleClass('loading');
		if ($('#create-team-btn').attr('disabled')) {
			$('#create-team-btn').removeAttr('disabled');
		}
		else {
			$('#create-team-btn').attr('disabled', true);
		}
	},

	createTeam: function (event) {
		var name = $('input#name').val(),
			own = $('input#own').is(':checked');
		
		var user = this.user;
		var team = new app.models.Team();
		var data = {
			name: name,
			members: [ user.get('id') ]
		};
		if (own) {
			data.owner = user.get('id');
		}
	
		team.save(data, {
			success: function (teamModel) {
				var teams = user.get('teams');
				teams.push(teamModel.id);
				var data = { teams: teams };
				user.save(data, {
					success: function (userModel) {
						app.router.navigate("/welcome/" + userModel.id, { trigger: true });
					}
				});
			}
		});
	},

	goBack: function (event) {
		app.router.navigate("/welcome/" + this.user.id, { trigger: true });
	}

});