var mongoose = require('mongoose'),	
	User = mongoose.model('User'),
	pager = require('../utils/pager.js'),
	ViewTemplatePath;

module.exports = function(app,templatePath) {
		
	app.param(['to', 'from'], function(n){ return parseInt(n, 10); });
	app.get('/users.:format?', index);	
	app.get('/users/:from-:to.:format?', index);	
	app.get('/users/load', load);	
    app.post('/users', create);
    app.get('/user/:id.:format?', show);
    app.get('/user/:id/edit', edit);
    app.put('/user/:id.:format?', update);    
    app.del('/user/:id.:format?', destroy);    
    ViewTemplatePath = templatePath;
    
}

function load(req,res) {
	
	for(i = 1; i <= 5000; i++){

		var user = new User();
		user.name = "User-" + user.id;
    	user.email = "User-"+ user.id + "@example.com";
    	user.save();
    	
	}
	req.flash('info', 'Users added!');
    res.redirect('/users');
    
}

// /users
function index(req, res, next) {
	  	 
	  var from = req.params.from ? req.params.from - 1 : 0;
	  var to = req.params.to ? req.params.to : 10;
      var total = 0;
      
      User.count({}, function (err, count) {
    	total = count;  
    	var pagerHtml = pager.render(from,to,total,'/users');    	
                  
		  User.find({})
		  	.sort('name', 1)
		  	.skip(from).limit(to)
		  	.find(function (err, users) {
			
			  if(err) return next(err);
			  
		      switch (req.params.format) {
		        case 'json':	          
		          res.send(users.map(function(u) {
		              return u.toObject();
		          }));
		          break;
	
		        default:
		        	console.log("Rendering ...");
		        	res.render(ViewTemplatePath,{users:users,pagerHtml:pagerHtml});
		      }
		      
		  });
      
      });
      	  	
}

  // /users/:id
function show(req, res, next) {	  		  
		
	  User.findById(req.params.id, function(err, user) {
		  
		  if(err) return next(err);
		  
	      switch (req.params.format) {
	        case 'json':
	          res.send(user.toObject());
	          break;

	        default:
	        	res.render(ViewTemplatePath + "/show",{user:user});
	      }
	      
	  });
	      
};
  
  // /users/:id/edit
function  edit(req, res, next){
	  User.findById(req.params.id, function(err, user) {
		  if(err) return next(err);
		  res.render(ViewTemplatePath + "/edit",{user:user});
	});
};
  
  // PUT /users/:id  
function update(req, res, next){
    
    User.findById(req.params.id, function(err, user) {
        
    	if (!user) return next(err);
        
    	user.name = req.body.user.name;
    	user.email = req.body.user.email;        	
    	
        user.save(function(err) {
        
    	  if (err) {
    		  console.log(err);
        	  req.flash('error','Could not update user: ' + err);
          	  res.redirect('/users');
          	  return;
    	  }
    		
          switch (req.params.format) {
            case 'json':
              res.send(user.toObject());
              break;
            default:
              req.flash('info', 'User updated');
              res.redirect('/user/' + req.params.id);
          }
        });
      });
};
  
  // POST /users
function create(req, res, next){
	  
	  var user = new User(req.body.user);
	  
	  user.groups.push("users");
  	  user.roles.push("users");
  	
	  user.save(function(err) {
	   
		if (err) {
    	  req.flash('error','Could not create user: ' + err);
      	  res.redirect('/users');
      	  return;
		}

	    switch (req.params.format) {
	      case 'json':
	        res.send(user.toObject());
	        break;

	      default:
	    	  req.flash('info','User created');
	      	  res.redirect('/user/' + user.id);
		 }
	  });	  
	  
};
  
// DEL /users
// Always comes in as an ajax request in this model - never redirect
function destroy(req, res, next){
	  
	  User.findById(req.params.id, function(err, user) {
	        
	    	if (!user) { 
  	    	  	req.flash('error','Unable to locate the user to delete!');
	    		res.send('false'); 
	    		return false; 
	    	};
	    		    
	    	user.remove(function(err) {
    		  if(err) {
    	    	  req.flash('error','There was an error deleting the user!');
    			  res.send('false');
    		  } else {
    	    	  req.flash('info','User deleted');
    			  res.send('true');
    		  }    	          
   	      	}); 
	  });
	  
};