app.models.User = Backbone.Model.extend( {

	url : function() {
		var url = app.config.dbhost + "/users";
		if (this.get('id')) {
			url += "/" + this.get('id');
		}
		return url;
	},

	idAttribute : "_id"

});

app.models.UserCollection = Backbone.Collection.extend( {

	url : app.config.dbhost + "/users",

	model : app.models.User

});