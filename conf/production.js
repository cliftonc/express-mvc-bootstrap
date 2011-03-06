
/**
 * TEST Environment settings
 */
module.exports = function(app,express) {
		
	app.set('db-uri', 'mongodb://localhost/mvc-test');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: false }));
	
}
