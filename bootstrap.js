/**
 * ExpressJs MVC Bootstrap
 * @Params - cmd - server | script | params
 */

/**
 * Require everything in the library folder
 */
require.paths.unshift(__dirname + '/lib');

/**
 * Explicit module dependencies
 */
var express = require('express');

/**
 * Main Command router
 */
var appLauncher = {
					command:'server',
				    server: { port:3000 },
				    script: { name:'help',
				    		  params: []
				    		}
				   };

for(var i in process.argv) {
	// Skip the first two - Node and app.js path
	if(i>1) {		
		processParam(process.argv[i],i);
	}
}
runLauncher(appLauncher);

/**
 * Run the launcher
 * @param appLauncher
 */
function runLauncher(appLauncher) {
	if(appLauncher.command == 'server') {
		runServer(appLauncher.server.port);
	} else {
		runScript(appLauncher.script);		
	}
}

/**
 * Run a script
 * @param appLauncher
 */
function runScript(scriptLauncher) {	
	var script = require('./scripts/'+ scriptLauncher.name);
	script.execute(scriptLauncher.params);
}

/**
 * Process params into array to enable launch
 * @param param
 * @param params
 */
function processParam(param,depth) {
	
	var paramArray = param.split("=");
	
	// Run command - must always come after the app
	if(i == 2) {
		appLauncher.command = param;
	}
	
	// Server.port
	if(paramArray[0] == "server.port" && paramArray[1] != undefined) {
		appLauncher.server.port = paramArray[1];
	}
	
	// 
	if(appLauncher.command == "script" && i == 3) {
		appLauncher.script.name = param;
	}
	
	// Script params
	if(appLauncher.command == 'script' && i > 3) {
		appLauncher.script.params.push(param);
	}
	
}

/**
 * Launch a server
 */
function runServer(port) {
	var app = express.createServer();
	require('./mvc').boot(app);
	app.listen(port);
	console.log('Express app started on port ' + port);	
}
