app.views.UserListView = app.Extensions.View.extend({
 
    tagName:'ul',
    className: 'table-view users-table',
 
    initialize: function (options) {
		this.collection.bind("reset", this.render, this);
		this.navType = options.navType;
		this.listTitle = options.listTitle;
		this.cssClass = options.cssClass;
    },
    
    events : {
		
	},
 
    render:function (eventName) {
    	$(this.el).empty();
    	if (this.listTitle) {
    		$(this.el).append('<li class="table-view-divider">' + this.listTitle + '</li>');
    	}
  
        _.each(this.collection.models, function (user) {
            $(this.el).append(new app.views.UserListItemView({ model:user, navType: this.navType, cssClass: this.cssClass }).render().el);
        }, this);
        return this;
    }
});