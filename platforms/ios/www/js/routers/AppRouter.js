app.routers.AppRouter = Backbone.Router.extend({
	
	currentView : null,
    routes: {
        "":                         "home",
        "login":                    "login",
        "signup":                   "signup",
        "employees/:id":            "employeeDetails",
        "employees/:id/reports":    "reports",
        "employees/:id/map":        "map"
    },

    initialize: function () {
        app.slider = new PageSlider($('body'));
    },
	
	replaceView: function (view) {
		this.currentView.remove();
		this.currentView.unbind();
		this.currentView = view;
	},

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
			this.currentView = app.homeView;
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        app.slider.slidePage(app.homeView.$el);
    },
    
    login: function() {
		var loginView = new app.views.LoginView();
        loginView.render();
        app.slider.slidePage(loginView.$el);
		
		this.replaceView(loginView);
    },
    
    signup: function() {
        var signupView = new app.views.SignupView();
        signupView.render();
        app.slider.slidePage(signupView.$el);
		
		this.replaceView(signupView);
    },

    employeeDetails: function (id) {
        var employee = new app.models.Employee({id: id});
        employee.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of EmployeeFullView
                // instead of creating new instances
                app.slider.slidePage(new app.views.EmployeeView({model: data}).render().$el);
            }
        });
    },

    reports: function (id) {
        var employee = new app.models.Employee({id: id});
        employee.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of EmployeeFullView
                // instead of creating new instances
                app.slider.slidePage(new app.views.ReportsView({model: data}).render().$el);
            }
        });
    },

    map: function (id) {
        app.slider.slidePage(new app.views.MapView().render().$el);
    }

});