/**
 *
 *  A directive that is attached to the container of the message elements in the chat view
 *  that causes it to automatically scroll down to display the latest message. jQuery's 
 *  animate method is used to implement a smooth scroll.
 *
**/


import angular from 'angular';
import $ from 'jquery';


// only needs post link function
(() => {
	angular.module('app.autoScroll', [])
		.directive('autoScroll', () => (scope, el) => {
			const $container = $('#messages-container');

			// el[0].children are all individual messages
			const messageCount = () => el[0].children.length;


			const scrollDown = count => {
				let message = el[0].children[count - 1];

				// timeout to allow DOM to render
				setTimeout(() => {
					$container.stop(true);		// cancel previous scrolls
					$container.animate({
						scrollTop: message.offsetTop + message.offsetHeight
					}, 500);
				}, 0);
			};

			// verify messages are loaded
			scope.$watch(messageCount, count => count > 0 ? scrollDown(count) : null);
		});
})();

