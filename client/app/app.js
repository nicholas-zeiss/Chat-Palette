angular.module('chatPaletteApp', [])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: 'index.html',
      controller: 'chatPaletteApp'
    })
    .when('/signup', {
	  template: '/auth/signup.html',
	  controller: 
    })
    .when('/login', {
      template: '/auth/login.html'
    })
    .otherwise({
      redirectTo:'/'
    });
});