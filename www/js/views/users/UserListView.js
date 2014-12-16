app.views.UserListView = app.Extensions.View.extend({
 
    tagName:'ul',
    className: 'table-view users-table',
 
    initialize:function () {
        this.collection.bind("reset", this.render, this);
    },
    
    events : {
		
	},
 
    render:function (eventName) {
    	$(this.el).empty();
    	$(this.el).append('<li class="table-view-divider">Team Members</li>');
        _.each(this.collection.models, function (user) {
            $(this.el).append(new app.views.UserListItemView({ model:user }).render().el);
        }, this);
        return this;
    }
});