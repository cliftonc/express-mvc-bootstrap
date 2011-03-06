
/**
 * Default configuration manager
 * Inject app and express reference
 */
module.exports = function(app,express) {
	
	// Defaults - apply to all environments
	app.set('app-name','Node.JS Application Template');
	
	// DEVELOPMENT
	app.configure('development', function() {
	  require("./development.js")(app,express);
	});

	// TEST
	app.configure('test', function() {
		require("./test.js")(app,express);
	});
	
	// PRODUCTION
	app.configure('production', function() {
		require("./production.js")(app,express);
	});		

}
