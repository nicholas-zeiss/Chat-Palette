/**
 *
 *  A directive that is attached to the container of the message elements in the chat view
 *  that causes it to automatically scroll down to display the latest message. jQuery's 
 *  animate method is used to implement a smooth scroll.
 *
**/


import angular from 'angular';
import $ from 'jquery';


//directive factory only returns post link function, no need to bother with the config object
(() => {
	angular.module('app.autoScroll', [])
		.directive('autoScroll', () => (scope, el) => {
			const $container = $('#messages-container');

			//el.children are all individual messages
			const messageCount = () => el[0].children.length;


			const scrollDown = count => {
				let message = el[0].children[count - 1];

				//timeout is necessary to allow browser to render padding/borders of added message
				setTimeout(() => {
					$container.stop(true);		//if currently scrolling, stop scrolling and clear any scrolls queued before this one

					$container.animate({
						scrollTop: message.offsetTop + message.offsetHeight
					}, 500);
				}, 0);
			};

			//as this listener will be called before any messages are loaded verify count > 0
			scope.$watch(messageCount, count => count > 0 ? scrollDown(count) : null);
		});
})();

