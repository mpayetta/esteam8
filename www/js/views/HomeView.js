app.views.HomeView = app.Extensions.View.extend({

    render: function () {
        this.$el.html(this.template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    },

    events: {
        "click #go-login":      "goLogin",
        "click #go-signup":     "goSignup"
    },

    goLogin: function (event) {
    	app.router.navigate("/login", { trigger: true });
    },

    goSignup: function (event) {
        app.router.navigate("/signup", { trigger: true });
    }

});