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
		.directive('autoScroll', () => (
			(scope, el) => {
				const messageCount = () => el[0].children.length;

				//performs the scroll animation
				const scrollDown = count => {
					let message = el[0].children[count - 1];

					//timeout is necessary to allow browser to render padding/borders of added message
					setTimeout(() => {
						$('#messages-container').animate({
							scrollTop: message.offsetTop + message.offsetHeight
						}, 1000);
					}, 0);
				};

				scope.$watch(messageCount, count => count ? scrollDown(count) : null);
			}
		));
})();

