/**
 *
 *  Controller for the chat view. It acquires messages from the server, handles posting of a message, and filters the
 *  messages based on color.
 *
**/


function ChatController($window, $location, $scope, serverCalls) {


	function failure(err) {
		$window.sessionStorage.clear();
		$location.path('/');

		console.error(err);
	}


	const addMessage = message => {
		console.log('received message from server:\n', message);
		console.log(vm.messages.length);
		vm.messages.push(message);
		console.log(vm.messages.length);
		$scope.$apply();
	};
	

	if (!$window.sessionStorage.getItem('username') || !$window.sessionStorage.getItem('token')) {
		failure('can\'t load chat controller w/o token');
	}

	let socketAuthorized = false;
	const vm = this;

	vm.color = 'clear';
	vm.messages = [];
	vm.message = { 
		color: 'clear',
		content: '',
		username: $window.sessionStorage.getItem('username')
	};


	serverCalls
		.getMessages()
		.then(res => vm.messages.push(...res.data), failure);


	const socket = io.connect('http://localhost:8080');

	socket
		.emit('authenticate', { token: $window.sessionStorage.getItem('token') })
		.on('authenticated', () => {
			socketAuthorized = true;
			socket.on('message', addMessage);
			socket.on('500', () => console.error('Server error creating message'));
		})
		.on('unauthorized', err => {
			console.log('socket connection unathorized');
			socket.disconnect();
			failure(err);
		});

  
	vm.sendMessage = () => {
		if (socketAuthorized) {
			socket.emit('message', Object.assign({}, vm.message));
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


	vm.logout = () => {
		$window.sessionStorage.clear();
		$location.path('/');
	};
}


export default ChatController;

