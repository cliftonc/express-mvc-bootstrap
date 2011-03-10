
/**
 * Default configuration manager
 * Inject app and express reference
 */
module.exports = function(app,express) {
		
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
