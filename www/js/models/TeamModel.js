app.models.Team = Backbone.Model.extend({
	
	url: function() {
		var url = app.config.dbhost + "/teams";
		var id = this.id || this.get('id');
		if (id) {
			url += "/" + id;
		}
		return url;
	},
	
	idAttribute: '_id',
	
	defaults: {
		name: '',
		owner: ''
	}
});

app.models.TeamCollection = Backbone.Collection.extend({
	
	url: app.config.dbhost + "/teams",
	
    model: app.models.Team

});