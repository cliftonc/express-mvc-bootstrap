
/**
 *  Examples Controller
 *  Created by create-controller script @ Fri Mar 11 2011 21:16:50 GMT+0000 (GMT)
 **/
 var mongoose = require('mongoose'),	
	Example = mongoose.model('Example'),
	pager = require('../utils/pager.js'),
	ViewTemplatePath = 'examples';

module.exports = {

	init: function(params) {
		ViewTemplatePath = params.viewPath   // Enable over-ride of view path for testing
	},
	
	/**
	 * Index action, returns a list either via the views/examples/index.html view or via json
	 * Default mapping to GET '/examples'
	 * For JSON use '/examples.json'
	 **/
	index: function(req, res, next) {
		  	 
		  var from = req.params.from ? parseInt(req.params.from) - 1 : 0;
		  var to = req.params.to ? parseInt(req.params.to) : 10;
	      var total = 0;
	      
	      Example.count({}, function (err, count) {
	    	total = count;  
	    	var pagerHtml = pager.render(from,to,total,'/examples');    	
	                  
			  Example.find({})
			  	.sort('name', 1)
			  	.skip(from).limit(to)
			  	.find(function (err, examples) {
				
				  if(err) return next(err);
				  
			      switch (req.params.format) {
			        case 'json':	          
			          res.send(examples.map(function(u) {
			              return u.toObject();
			          }));
			          break;
		
			        default:			        	
			        	res.render(ViewTemplatePath,{examples:examples,pagerHtml:pagerHtml});
			      }
			      
			  });
	      
	      });
	      	  	
	},
	
	/**
	 * Show action, returns shows a single item via views/examples/show.html view or via json
	 * Default mapping to GET '/example/:id'
	 * For JSON use '/example/:id.json'
	 **/	
	show: function(req, res, next) {	  		  
			
		  Example.findById(req.params.id, function(err, example) {
			  
			  if(err) return next(err);
			  
		      switch (req.params.format) {
		        case 'json':
		          res.send(example.toObject());
		          break;
	
		        default:
		        	res.render(ViewTemplatePath + "/show",{example:example});
		      }
		      
		  });
		      
	},
	
	/**
	 * Edit action, returns a form via views/examples/edit.html view no JSON view.
	 * Default mapping to GET '/example/:id/edit'
	 **/  	  
	edit: function(req, res, next){
		  Example.findById(req.params.id, function(err, example) {
			  if(err) return next(err);
			  res.render(ViewTemplatePath + "/edit",{example:example});
		});
	},
	  
	/**
	 * Update action, updates a single item and redirects to Show or returns the object as json
	 * Default mapping to PUT '/example/:id', no GET mapping	 
	 **/  
	update: function(req, res, next){
	    
		
		
	    Example.findById(req.params.id, function(err, example) {
	        
	    	if (!example) return next(err);
	        
	    	example.name = req.body.example.name;
	    	
	        example.save(function(err) {
	        
	    	  if (err) {
	    		  console.log(err);
	        	  req.flash('error','Could not update example: ' + err);
	          	  res.redirect('/examples');
	          	  return;
	    	  }
	    		
	          switch (req.params.format) {
	            case 'json':
	              res.send(example.toObject());
	              break;
	            default:
	              req.flash('info', 'Example updated');
	              res.redirect('/example/' + req.params.id);
	          }
	        });
	      });
	},
	  
	/**
	 * Create action, creates a single item and redirects to Show or returns the object as json
	 * Default mapping to POST '/examples', no GET mapping	 
	 **/  
	create: function(req, res, next){
		
		  var example = new Example(req.body.example);
		  
		  example.save(function(err) {
		   
			if (err) {
	    	  req.flash('error','Could not create example: ' + err);
	      	  res.redirect('/examples');
	      	  return;
			}
	
		    switch (req.params.format) {
		      case 'json':
		        res.send(example.toObject());
		        break;
	
		      default:
		    	  req.flash('info','Example created');
		      	  res.redirect('/example/' + example.id);
			 }
		  });	  
		  
	},
	  
	/**
	 * Delete action, deletes a single item and redirects to index
	 * Default mapping to DEL '/example/:id', no GET mapping	 
	 **/ 
	destroy: function(req, res, next){
		  
		  Example.findById(req.params.id, function(err, example) {
		        
		    	if (!example) { 
	  	    	  	req.flash('error','Unable to locate the example to delete!');
		    		res.render('404'); 
		    		return false; 
		    	};
		    		    
		    	example.remove(function(err) {
	    		  if(err) {
	    	    	  req.flash('error','There was an error deleting the example!');
	    			  res.send('false');
	    		  } else {
	    	    	  req.flash('info','Example deleted');
	    			  res.send('true');
	    		  }    	          
	   	      	}); 
		  });
		  
	}
	
};