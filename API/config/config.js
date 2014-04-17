var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

	
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'api'
    },
    port: 3000,
    db: 'mongodb://AFSTBWS406/api-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'api'
    },
    port: 3000,
    db: 'mongodb://localhost/api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'api'
    },
    port: 3000,
    db: 'mongodb://localhost/api-production'
  }
};

exports.env = config[env];
exports.envname = env;

exports.google = {
	clientId: '290878766321-c9m0lt0tbok14mpbitbujuv4ok6sigc0.apps.googleusercontent.com'
  , clientSecret: 'RI6OmTA7rVAZH2pyRYp9DO_a'
};
