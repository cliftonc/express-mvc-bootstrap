var ejs = require('ejs')
   , fs = require('fs')
   , path = require('path');

/** 
 * Script to create a default model
 */
exports.execute = function(params,appPath) {
		 
	if(params.length == 0 ) {
		console.log("You must specifiy a model name.");
		return;
	}
	
	var modelName = params[0];
	var modelFile = appPath + "/models/" + params[0] + '.js'
	var modelTemplate = __dirname + '/templates/create-model.template.ejs';
		
	// Check if it already exists
	var fileCheck = path.existsSync(modelFile);
	if(fileCheck) {		
		if(params[1] != "force") {
			console.log("The model already exists!");
			console.log("Add an additional paramater of 'force' to over write the model.");
			console.log("e.g. script create-model " + modelName + " force");
			return;
		}
	}
	
	// Read the template
	var str = fs.readFileSync(modelTemplate, 'utf8');		
	
	// Render the model
	var ret = ejs.render(str, {
	  locals: {
	    name:params[0]
	  },open: "<?",close: "?>"
	});
	
	// Write the file
	fs.writeFileSync(modelFile, ret,'utf8');
	
	console.log('Model ' + modelName + ' created in models/' + modelName + '.js');
	
	
};