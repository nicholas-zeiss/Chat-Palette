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


	const loadMessages = () => {
		serverCalls
			.getMessages()
			.then(messages => {
				vm.messages = messages;
			})
			.catch(err => {
				if (err.status == 401) {
					$window.sessionStorage.clear();
					$location.path('/');
				}

				console.error(err);
			});
	};


	loadMessages();


	const addMessage = message => {
		vm.messages.push(message);
	};

  
	vm.sendMessage = () => {
		serverCalls
			.sendMessage(vm.message)
			.then(() => {
				addMessage(Object.assign({}, vm.message));
				delete vm.message.content;
			})
			.catch(err => {
				if (err.status == 401) {
					$window.sessionStorage.clear();
					$location.path('/');
				}

				console.error(err);
			});
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

