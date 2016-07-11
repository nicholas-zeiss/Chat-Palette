angular.module('app', [
  'app.auth',
  'app.services',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'AuthController'
    })
    .when('/signup', {
	  templateUrl: 'app/auth/signup.html',
	  controller: 'AuthController'
    })
    .when('/login', {
      templateUrl: 'app/auth/login.html'
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 