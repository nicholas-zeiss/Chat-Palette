/**
 *
 *  Controller for the chat view. It acquires messages from the server, handles posting of a message, and filters the
 *  messages based on color.
 *
**/


function ChatController($window, $location, serverCalls) {
	
	if (!$window.sessionStorage.getItem('username') || !$window.sessionStorage.getItem('token')) {
		$window.sessionStorage.clear();
		$location.path('/');
	}

	const vm = this;

	vm.color = 'clear';
	vm.messages = [];
	vm.message = { 
		color: 'clear',
		username: $window.sessionStorage.getItem('username')
	};


	serverCalls
		.getMessages()
		.then(res => vm.messages = res.data, failure);


	const socket = io.connect('http://localhost:8080');

	socket
		.emit('authenticate', { token: $window.sessionStorage.getItem('token') })
		.on('authenticated', () => {
			console.log('authenticated!');
		})
		.on('unauthorized', err => {
			socket.disconnect();
			failure(err);
		});

  

	vm.sendMessage = () => {
		serverCalls
			.sendMessage(vm.message)
			.then(() => {
				vm.messages.push(Object.assign({}, vm.message));
				delete vm.message.content;
			}, failure);
	};

  
	vm.filter = color => {
		vm.color = color;
	};


	vm.setMessageColor = color => {
		vm.message.color = color;
	};


	vm.logout = () => {
		$window.sessionStorage.clear();
		$location.path('/');
	};


	function failure(err) {
		$window.sessionStorage.clear();
		$location.path('/');

		console.error(err);
	}
}


export default ChatController;

