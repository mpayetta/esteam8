app.views.UserListItemView = app.Extensions.View.extend({
 
    tagName:"li",
    
    className: "table-view-cell",
    
    initialize: function (options) {
		this.navType = options.navType;
		this.cssClass = options.cssClass;
	},
    
    render:function (eventName) {
        $(this.el).html(this.template({ user: this.model.toJSON(), navType: this.navType, cssClass: this.cssClass }));
        return this;
    }
 
});