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

	vm.messages = [];
	vm.message = { color: 'clear', username: $window.sessionStorage.getItem('username') };
	vm.color = 'clear';


	const addMessage = message => {
		vm.messages.push(message);
	};


	const failure = err => {
		if (err.status == 401) {
			$window.sessionStorage.clear();
			$location.path('/');
		}

		console.error(err);
	};


	const loadMessages = () => {
		serverCalls
			.getMessages()
			.then(res => {
				vm.messages = res.data;
			}, failure);
	};


	loadMessages();

  
	vm.sendMessage = () => {
		serverCalls
			.sendMessage(vm.message)
			.then(() => {
				addMessage(Object.assign({}, vm.message));
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
}


export default ChatController;

