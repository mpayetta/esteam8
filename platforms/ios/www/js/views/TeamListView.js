app.views.TeamListView = app.Extensions.View.extend({
 
    tagName:'ul',
    className: 'table-view teams-table',
 
    initialize:function () {
        this.collection.bind("reset", this.render, this);
    },
    
    events : {
		
	},
 
    render:function (eventName) {
    	$(this.el).empty();
        _.each(this.collection.models, function (team) {
            $(this.el).append(new app.views.TeamListItemView({model:team}).render().el);
        }, this);
        return this;
    }
});