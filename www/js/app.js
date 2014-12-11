var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    services: {},
	config: {}
};

$(document).on("ready", function () {
    app.router = new app.routers.AppRouter();
    app.utils.templates.load(["LoginView", "SignupView", "HomeView" ],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
	});
});