var ViewTemplatePath;

module.exports = function(app,templatePath) {
	var prefix = "/";
	app.get(prefix, index);
	ViewTemplatePath = templatePath;
}

// /
function index(req, res) {
	 
	res.render(ViewTemplatePath,{});
	  	
};
