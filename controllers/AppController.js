var fs = require('fs');

var ViewTemplatePath;

module.exports = function(app,templatePath) {
	var prefix = "/";
	app.get(prefix, index);
	ViewTemplatePath = templatePath;
}

// /
function index(req, res) {
	 
	var controllers = [];
	
	  fs.readdir(__dirname + '/', function(err, files){
	    
		if (err) throw err;
	    
		files.forEach(function(file){
			if(file != "AppController.js") {
				controllers.push(file.replace('Controller.js','').toLowerCase());
			}
	    });
	    
		res.render(ViewTemplatePath,{controllers:controllers});
	  
	  });	
	
	  	
};
