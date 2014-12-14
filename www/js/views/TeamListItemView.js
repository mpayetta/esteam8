app.views.TeamListItemView = app.Extensions.View.extend({
 
    tagName:"li",
    
    className: "table-view-cell",
  
    render:function (eventName) {
        $(this.el).html(this.template({ team: this.model.toJSON() }));
        return this;
    }
 
});