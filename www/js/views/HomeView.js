app.views.HomeView = Backbone.View.extend({

    render: function () {
        this.$el.html(this.template());
        return this;
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