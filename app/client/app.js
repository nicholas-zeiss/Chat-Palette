/**
 * Main module for Chat Palatte App
 */

angular.module('app', [
  'app.auth',
  'app.services',
  'app.chat',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'auth/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthController'
    })
    .when('/login', {
      templateUrl: 'auth/login.html',
      controller: 'AuthController'
    })
    .when('/chat', {
      templateUrl: 'chat/chat.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo:'/'
    });
});