var app = angular.module('frontMainApp', [
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute']);

app.config([
    '$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);
//# sourceMappingURL=app.js.map
