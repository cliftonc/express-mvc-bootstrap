var fs = require('fs')
	, inflection = require('../lib/inflection');

module.exports = function(app) {
	
	// app.get("/favicon.ico", function() {}); // Required if you delete the favicon.ico from public
	
	// Plural
	app.get("/:controller?", router);				        // Index
	app.get("/:controller.:format?", router);				// Index
	app.get("/:controller/:from-:to.:format?", router);		// Index
	
	// Plural Create & Delete
	app.post("/:controller", router);			// Create
	app.del("/:controller", router);   			// Delete all
	
	// Singular - different variable to clarify routing
	app.get("/:controller/:id.:format?", router);  	// To support controller/index	
	app.get("/:controller/:id/:action", router);		// Show edit
	app.put("/:controller/:id", router);				// Update
	app.del("/:controller/:id", router);				// Delete	
	
}

///
function router(req, res, next) {
		
	var controller = req.params.controller ? req.params.controller : '';
	var action = req.params.action ? req.params.action : '';
	var id = req.params.id ? req.params.id : '';
	var method = req.method.toLowerCase();
	var fn = 'index';
	
	// Default route
	if(controller.length == 0) {
		index(req,res,next);
		return;
	}		
	
	// Determine the function to call based on controller / model and method
	if(id.length == 0) {
		
		// We are plural
		switch(method) {
			case 'get':
				fn = 'index';
				break;
			case 'post':
				fn = 'create';
				break;
			case 'delete':
				fn = 'destroyAll';
				break;		
		}		
		
	} else {
		
		// Controller name is now singular, need to switch it back 
		controller = controller.pluralize();
		
		switch(method) {
			case 'get':
				if(action.length > 0) {
					fn = action;
				} else {
					fn = 'show';
				}
				break;
			case 'put':
				fn = 'update';
				break;
			case 'delete':
				fn = 'destroy';
				break;		
		}		
		
	}
			
	var controllerLibrary = require('./' + controller.capitalize() + 'Controller');			
	if(typeof controllerLibrary[fn] === 'function') {
		controllerLibrary[fn](req,res,next);		
	} else {
		res.render('404');
	}
	  	
};


/**
 * Default Application index - shows a list of the controllers.
 * Redirect here if you prefer another controller to be your index.
 * @param req
 * @param res
 */
function index(req, res, next) {
		 
	/**
	 * If you want to redirect to another controller, uncomment
	 */
	// res.redirect('/controllerName');
	
	var controllers = [];
	
	  fs.readdir(__dirname + '/', function(err, files){
	    
		if (err) throw err;
	    
		files.forEach(function(file){
			if(file != "AppController.js") {
				controllers.push(file.replace('Controller.js','').toLowerCase());
			}
	    });
	    
		res.render('app',{controllers:controllers});
	  
	  });	
	
	  	
};