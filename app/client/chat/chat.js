/**
 *
 *  Controller for the chat view. It acquires extant messages on load over http and creates a socket.io
 *	connection to post/receive new messages. Also handles filtering of visible messages by color.
 *
**/


function ChatController($window, $location, $scope, serverCalls) {


	//handler for logout/authorization failure
	const logout = () => {
		$window.sessionStorage.clear();
		$location.path('/');
	};
	

	if (!$window.sessionStorage.getItem('username') || !$window.sessionStorage.getItem('token')) {
		logout();
	}


	const vm = this;

	vm.color = 'clear';				//color for filtering messages
	vm.messages = [];
	vm.message = { 						//model for new message
		color: 'clear',
		content: '',
		username: $window.sessionStorage.getItem('username')
	};


	//load extant messages
	serverCalls
		.getMessages()
		.then(res => vm.messages.push(...res.data), logout);


	let socketAuthorized = false;
	const socket = io.connect($location.origin);

	socket
		.emit('authenticate', { 
			token: $window.sessionStorage.getItem('token') 
		})
		.on('authenticated', () => {
			socketAuthorized = true;

			socket.on('message', message => {
				vm.messages.push(message);
				
				//as above push happens outside angular we must force view to update
				$scope.$apply();
			});
			
			socket.on('500', () => console.error('Server error creating message'));
		})
		.on('unauthorized', () => {
			socket.disconnect();
			logout();
		});

  
	vm.sendMessage = () => {
		if (socketAuthorized) {
			socket.emit('message', Object.assign({}, vm.message));
		
			//reset message text input
			delete vm.message.content;
		
		} else {
			console.err('unable to post message without authorized socket connection');
		}
	};

  
	vm.filter = color => {
		vm.color = color;
	};


	vm.setMessageColor = color => {
		vm.message.color = color;
	};


	vm.logout = logout;
}


export default ChatController;

