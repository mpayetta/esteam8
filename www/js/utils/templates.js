app.utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];
        
        $.each(views, function(index, view) {
        	var parts = view.split("/");
        	var viewName = parts[parts.length-1];
            if (app.views[viewName]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                	app.views[viewName].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

    // The public API
    return {
        load: load
    };

}());