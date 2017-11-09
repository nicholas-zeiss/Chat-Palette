/**
 *
 *  Factory for our serverCalls service. serverCalls handles all http requests, passing responses to supplied callbacks.
 *
**/


import angular from 'angular';


(() => {
	angular.module('app.serverCalls', [])
		.factory('serverCalls', [ '$http', '$window', ($http, $window) => {

			const login = user => $http({
				method: 'POST',
				url: '/login',
				data: user
			});

			const signUp = user => $http({
				method: 'POST',
				url: '/signup',
				data: user
			});

			const getMessages = () => $http({
				method: 'GET',
				url: '/messages',
				headers: { Authorization: 'Bearer ' + $window.sessionStorage.token }
			});
			
			return {
				login,
				getMessages,
				signUp
			};

		}]);
})();

