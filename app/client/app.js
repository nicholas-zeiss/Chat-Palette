/**
 *
 *  Here we create our root level module, 'app', and configure the router.
 *  The rest of our front-end code is imported and loaded into the module.
 *
**/


import angular from 'angular';
import ngRoute from 'angular-route';

import AuthController from './auth/auth';
import ChatController from './chat/chat';
import './services/services';


angular.module('app', [
	'app.serverCalls',
	'ngRoute'
])
	.controller('AuthController', [
		'$window',
		'$location',
		'serverCalls',
		AuthController
	])
	.controller('ChatController', [
		'$window',
		'$location',
		'serverCalls',
		ChatController
	])
	.config($routeProvider => {
		$routeProvider
			.when('/', {
				templateUrl: 'auth/login.html',
				controller: 'AuthController',
				controllerAs: 'auth'
			})
			.when('/signup', {
				templateUrl: 'auth/signup.html',
				controller: 'AuthController',
				controllerAs: 'auth'
			})
			.when('/chat', {
				templateUrl: 'chat/chat.html',
				controller: 'ChatController',
				controllerAs: 'chat'
			})
			.otherwise({
				redirectTo:'/'
			});
	});

