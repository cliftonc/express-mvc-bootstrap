var  ejs = require('ejs')
   , fs = require('fs')
   , path = require('path');

/** 
 * Script to create a default view, requires the model to exist
 */
exports.execute = function(params,appPath) {
		 
	if(params.length == 0 ) {
		console.log("You must specifiy a model name to generate the views against!");
		return;
	}
	
	var modelName = params[0];
	var modelFile = appPath + "/models/" + params[0] + '.js'		
	var viewFolder = appPath + "/views/" + params[0].toLowerCase();
	
	var viewIndexTemplate = __dirname + '/templates/create-view.template.index.ejs';
	var viewEditTemplate = __dirname + '/templates/create-view.template.edit.ejs';
	var viewShowTemplate = __dirname + '/templates/create-view.template.show.ejs';
		
	// Check if the model exists
	var fileCheck = path.existsSync(modelFile);
	if(!fileCheck) {		
		console.log("The model you have specified doesn't exist!");
		console.log("You need to create the model first.");
		console.log("e.g. script create-model " + modelName);
		return;		
	}

	// Check if the view exists
	var fileCheck = path.existsSync(viewFolder);
	if(fileCheck) {		
		if(params[1] != "force") {
			console.log("The views folder already exists for this model!");
			console.log("Add an additional paramater of 'force' to over write the views.");
			console.log("e.g. script create-view " + modelName + " force");
			return;
		}
	} else {
		fs.mkdirSync(viewFolder,'755');
	}	
	
	// Read the template
	var tmpIndex = fs.readFileSync(viewIndexTemplate, 'utf8');
	var tmpEdit = fs.readFileSync(viewEditTemplate, 'utf8');
	var tmpShow = fs.readFileSync(viewShowTemplate, 'utf8');
	
	// Render the views
	var retIndex = ejs.render(tmpIndex, { locals: { name:params[0] },open: "<?",close: "?>" });
	var retEdit = ejs.render(tmpEdit, { locals: { name:params[0] },open: "<?",close: "?>" });
	var retShow = ejs.render(tmpShow, { locals: { name:params[0] },open: "<?",close: "?>" });
	
	// Write the file
	fs.writeFileSync(viewFolder + "/index.html", retIndex,'utf8');
	fs.writeFileSync(viewFolder + "/edit.html", retEdit,'utf8');
	fs.writeFileSync(viewFolder + "/show.html", retShow,'utf8');	
	
	console.log('Views ' + modelName + ' created in views/' + modelName.toLowerCase());
	
	
};