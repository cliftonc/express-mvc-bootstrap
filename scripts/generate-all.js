/** 
 * Script to create a model, controller and views
 */
exports.execute = function(params) {
		 
	if(params.length == 0 ) {
		console.log("You must specifiy a model name to generate all of the assets for!");
		return;
	}
	
	var modelScript = require('./create-model');	
	var controllerScript = require('./create-controller');
	var viewScript = require('./create-view');
	
	modelScript.execute(params);
	controllerScript.execute(params);
	viewScript.execute(params);
	
};