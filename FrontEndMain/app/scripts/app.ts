/// <reference path="_references.ts" />

//console.log = () => { };

var app = angular.module('frontMainApp', [
	'ui.bootstrap',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute']);

app.config([
	'$routeProvider', ($routeProvider) => {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]);


//Examples
//app.service(MiXTimesheets.Services.GlobalSettings.serviceName, MiXTimesheets.Services.GlobalSettings);
//app.controller(MiXTimesheets.Controllers.BaseController.ControllerName, MiXTimesheets.Controllers.BaseController);
//app.directive(MiXTimesheets.Directives.ViewInit.DirectiveName, ()=> { return new MiXTimesheets.Directives.ViewInit(); });
