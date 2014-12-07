require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        handlebars: 'libs/handlebars',
		text: 'libs/text',
		config: 'config',
		services: 'service',
        templates: '../templates'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }

});

require([

    // Load our app module and pass it to our definition function
    'app',
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});