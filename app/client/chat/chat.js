/**
 *
 *  Controller for the chat view. It acquires extant messages on load over http and creates a socket.io
 *	connection to post/receive new messages. Also handles filtering of visible messages by color.
 *
**/


function ChatController($window, $location, $scope, serverCalls) {

	const logout = () => {
		$window.sessionStorage.clear();
		$location.path('/');
	};
	

	//------------------------------------------------------------
	//											Initialization
	//------------------------------------------------------------

	// force anyone who manually loads this url w/o authorization to the login page
	if (!$window.sessionStorage.getItem('username') || !$window.sessionStorage.getItem('token')) {
		logout();
	}

	const vm = this;

	vm.color = 'clear';				// color for filtering messages
	vm.messages = [];
	vm.message = { 						// model for new message
		color: 'clear',
		content: '',
		username: $window.sessionStorage.getItem('username')
	};

	// load extant messages, force logout if unauthorized
	serverCalls
		.getMessages()
		.then(res => vm.messages.push(...res.data), logout);

	const socket = io.connect($location.origin);

	socket
		.emit('authenticate', { 
			token: $window.sessionStorage.getItem('token') 
		})
		.on('authenticated', () => {
			socket.on('message', message => {
				vm.messages.push(message);
				$scope.$apply();		// force angular to notice change
			});
			
			socket.on('500', () => console.error('Server error creating message'));
		})
		.on('unauthorized', () => {
			socket.disconnect();
			logout();
		});


	//------------------------------------------------------------
	//												Methods
	//------------------------------------------------------------
  
	vm.sendMessage = () => {
		socket.emit('message', Object.assign({}, vm.message));
		delete vm.message.content;
	};

	vm.filter = color => vm.color = color;

	vm.setMessageColor = color => vm.message.color = color;

	vm.logout = logout;
}


export default ChatController;

