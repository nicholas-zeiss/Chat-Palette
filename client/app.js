angular.module('chatPaletteApp', [])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: 'index.html',
      controller: 'chatPaletteApp'
    })
    .when('/signup', {
	  template: '/client/auth/signup.html',
	  controller: 
    })
    .when('/login', {
      template: '/client/auth/login.html'
    })
    .otherwise({redirectTo:'/'});
})