/**
 *   Authorization controller for login and sign up
 */ 
 
angular.module('app.auth', [])

.controller('AuthController', function($scope, $window, $location, Auth) {

  // login() - executes upon submission of the login form
  $scope.login = function() {
    Auth.login($scope.user)
      .catch(function(error) {
        console.error(error);
      });
  };

  // signUp() - executes upon submission of the signUp form
  $scope.signUp = function() {
    Auth.signUp($scope.user)
      .catch(function (error) {
        console.error(error);
      });
  };
});