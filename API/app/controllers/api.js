var mongoose = require('mongoose'),
     Article = mongoose.model('Article');

//Determine if client is logged in via google	 
exports.isLoggedIn = function(req, res){
	try{
		console.log(req);
		res.send({result:  req.loggedIn, authURL: '/auth/google'});
	}
	catch(ex){
		console.error("asp.js isLoggedIn exception:", ex);
		res.send({result: false, message: ex});
	}
};

//Web based whoami
exports.getUser = function(req, res){
	try{
		if(req.loggedIn)
			res.send(req.user);
		else
			res.send(401);
	}
	catch(ex){
		console.error("asp.js isLoggedIn exception:", ex);
		res.send({message: ex});
	}
};
