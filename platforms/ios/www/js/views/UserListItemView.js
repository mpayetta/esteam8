app.views.UserListItemView = app.Extensions.View.extend({
 
    tagName:"li",
    
    className: "table-view-cell",
  
    render:function (eventName) {
        $(this.el).html(this.template({ user: this.model.toJSON() }));
        return this;
    }
 
});