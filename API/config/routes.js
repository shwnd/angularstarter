module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);
	
	var api = require('../app/controllers/api');
	app.get('/api/isLoggedIn', api.isLoggedIn)
	app.get('/api/getUser', api.getUser)

};
