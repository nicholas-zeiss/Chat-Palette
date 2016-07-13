// Main module for Chat Palatte App
angular.module('app', [
  'app.auth',
  'app.services',
  'app.chat',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
<<<<<<< HEAD:client/app.js
  .when('/', {
    templateUrl: 'index.html',
    controller: 'AuthController'
  })
  .when('/signup', {
  templateUrl: 'app/auth/signup.html',
  controller: 'AuthController'
  })
  .when('/login', {
    templateUrl: '/app/auth/login.html'
    controller: 'AuthController'
  })
  .otherwise({
    redirectTo:'/'
  });
})
=======
    .when('/', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('/chat', {
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo:'/'
    });
});
>>>>>>> f4e87e0b094cf7c8ea5bdb8c3c2b012d717b7c03:client/app/app.js
 