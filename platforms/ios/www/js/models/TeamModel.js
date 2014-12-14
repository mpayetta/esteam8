app.models.Team = Backbone.Model.extend({
	
	url: function() {
		var url = app.config.dbhost + "/teams";
		if (this.get('id')) {
			url += "/" + this.get('id');
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