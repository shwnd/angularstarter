var express = require('express'),
    session = require('express-session'),
	mongoose = require('mongoose'),
	fs = require('fs'),
	config = require( './config/config'),
	connect = require('connect'),
	redis = require('connect-redis')(session),  
	everyauth = require('everyauth');


var usersById = {};
var nextUserId = 0;
var usersByGoogleId = {};  

if(config.envname === 'development')
	everyauth.debug = true;

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

function removeLastDirLevel(dir){
	var idx = dir.lastIndexOf("/");
	var del = "/";
	
	if(idx === -1){
		idx = dir.lastIndexOf("\\");
		del = "\\";
	}
	
	if(idx !== -1)
		return { directory: dir.substring(0, idx), delimeter: del}; 
		
}

    
mongoose.connect(config.env.db);
var db = mongoose.connection;
db.on('error', function (err){
  throw new Error('unable to connect to database at ' + config.env.db + " - error: " +err);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

everyauth.google
  .appId(config.google.clientId)
  .appSecret(config.google.clientSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile')
  .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
    googleUser.refreshToken = extra.refresh_token;
    googleUser.expiresIn = extra.expires_in;
    return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
  })
  .redirectPath('/web/index.html');

var app = express();
var dirminusone = removeLastDirLevel(__dirname);


app.use("/public",express.static(__dirname + '/public'))
	.use("/public",express.static(__dirname + '/public'))
	.use("/web",express.static(dirminusone.directory + "/FrontEndMain/app"))
	.use( express.cookieParser() )
	.use(session({ store: new redis(), secret: 'redissecret' }))
  //.use(express.favicon())
  .use(express.bodyParser())
  .use(express.cookieParser('htuayreve'))
  .use(express.session())
  .use(everyauth.middleware());

require('./config/express')(app, config.env);
require('./config/routes')(app);

app.listen(config.env.port);

console.log("Listening on: ", config.env.port);
