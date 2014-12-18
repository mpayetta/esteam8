app.models.User = Backbone.Model.extend( {

	url : function() {
		var url = app.config.dbhost + "/users";
		var id = this.id || this.get('id');
		if (id) {
			url += "/" + id;
		}
		return url;
	},
	
	fetchByName: function (username, options) {
        options = options || {};
        if (options.url === undefined) {
            options.url = app.config.dbhost + "/users/name/" + username;
        }

        return Backbone.Model.prototype.fetch.call(this, options);
    },
    
    fetchByEmail: function (email, options) {
        options = options || {};
        if (options.url === undefined) {
            options.url = app.config.dbhost + "/users/email/" + email;
        }

        return Backbone.Model.prototype.fetch.call(this, options);
    },

	idAttribute : "_id"

});

app.models.UserCollection = Backbone.Collection.extend( {

	url : app.config.dbhost + "/users",

	model : app.models.User,
	
	byName: function(name) {
		filtered = this.filter(function(user) {
			return user.get("name").indexOf(name) > -1;
	    });
	    return new UserCollection(filtered);
	}

});