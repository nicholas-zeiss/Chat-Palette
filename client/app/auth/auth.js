/**
 *   Authorization controller for login and sign up
 */ 
 
angular.module('app.auth', [])

.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};

  // login() - executes upon submission of the login form
  $scope.login = function(user) {
    Auth.login(user)
      .then(function(user) {
        $scope.user.user = user;
      })
      .catch(function(error) {
        console.error(error);
      });
    $location.path('/chat');
  };

  // signUp() - executes upon submission of the signUp form
  $scope.signUp = function(user) {
    Auth.signUp(user)
      .then(function(user) {
        $location.path('/chat');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});