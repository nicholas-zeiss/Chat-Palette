/**
 *
 *  Factory for our serverCalls service. serverCalls handles all http requests, passing responses to supplied callbacks.
 *
**/


import angular from 'angular';


(() => {
	angular.module('app.serverCalls', [])
		.factory('serverCalls', [ '$http', '$location', '$window', ($http, $location, $window) => {


			const handleResponse = request => (
				request
					.then(res => res.data ? res.data : res)
					.catch(err => {
						console.error(err);
						return err;
					})
			);


			const login = user => (
				handleResponse($http({
					method: 'POST',
					url: '/login',
					data: user
				}))
			);


			const signUp = user => (
				handleResponse($http({
					method: 'POST',
					url: '/signup',
					data: user
				}))
			);


			const sendMessage = message => (
				handleResponse($http({
					method: 'POST',
					url: '/chat',
					headers: { Authorization: 'Bearer ' + $window.sessionStorage.token },
					data: message
				}))
			);


			const getMessages = () => (
				handleResponse($http({
					method: 'GET',
					url: '/chat',
					headers: { Authorization: 'Bearer ' + $window.sessionStorage.token }
				}))
			);

			
			return {
				login,
				getMessages,
				sendMessage,
				signUp
			};
		}]);
})();

