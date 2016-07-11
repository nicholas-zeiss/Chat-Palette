angular.module('chatPaletteApp', [])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: 'index.html',
      controller: 'chatPaletteApp'
    })
    .when('/signup', {
	  template: '/chatPaletteApp/auth/signup.html',
	  controller: 
    })
    .when('/login', {
      template: '/chatPaletteApp/auth/login.html'
    })
    .otherwise({redirectTo:'/'});
})