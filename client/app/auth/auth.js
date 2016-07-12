/*************************************************
* Authorization controller for login and sign up
**************************************************/

angular.module('app.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
	$scope.user = {};

	// login() - executes upon submission of the login form
	$scope.login = function() {
		Auth.login($scope.user)
			.then(function ($scope.user) {
				$location.path('/chat');
			})
			.catch(function (error) {
				console.error("Ridwan's code suck!");
			});
	};

	// signUp() - executes upon submission of the signUp form
	$scope.signUp = function() {
		Auth.signUp($scope.user)
			.then(function ($scope.user) {
				$location.path('/chat');
			})
			.catch(function (error) {
				console.log(error("Ridwan's server's broke");
			});
	};
});

