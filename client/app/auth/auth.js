angular.module('app.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth){
	$scope.user = {};

	$scope.login = function(){
		Auth.login($scope.user)
			.then(function ($scope.user) {
				$location.path('/chat');
			})
			.catch(function (error) {
				console.error("Ridwan's code suck!");
			});
	};

	$scope.signup = function(){
		Auth.signup($scope.user)
			.then(function ($scope.user){
				$location.path('/signup');
			})
			.catch(function (error){
				console.log(error("Ridwan's server is broke");
			})
	}
});

