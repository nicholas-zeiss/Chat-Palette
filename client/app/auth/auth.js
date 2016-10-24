/**
 *   Authorization controller for login and sign up
 */ 
 
angular.module('app.auth', [])

.controller('AuthController', function($scope, $window, $location, Auth) {

  // login() - executes upon submission of the login form
<<<<<<< HEAD
  $scope.login = function(user) {
        Auth.login(user)
      .then(function(user) {
        $scope.user.user = user;
        $location.path('/chat');
        console.log('user from server: ', user);
=======
  $scope.login = function() {
    Auth.login($scope.user)
      .then(function(res) {
        $location.path('/chat');
>>>>>>> 2e588bcfa2bae07da58f648fa4f0c6fcd3a70f5d
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  // signUp() - executes upon submission of the signUp form
  $scope.signUp = function() {
    Auth.signUp($scope.user)
      .then(function(res) {
        $location.path('/chat');
      })
      .catch(function(error) {
        console.log(error);
      })
  };
});