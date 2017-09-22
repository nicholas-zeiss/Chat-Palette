/**
 *
 *  Controller for the chat view. It acquires messages from the server, handles posting of a message, and filters the
 *  messages based on color.
 *
**/


function ChatController($window, $location, serverCalls) {
	const vm = this;

	vm.messages = [];
	vm.message = {};
	vm.color = 'all';

	serverCalls
		.getMessages()
		.then(messages => {
			vm.messages = messages;
		})
		.catch(err => {
			if (err.status == 401) {
				$window.sessionStorage.removeItem('token');
			}

			console.error(err);
		});

  
	vm.sendMessage = () => {
		serverCalls
			.sendMessage(vm.message)
			.then(() => {
				vm.messages.push(vm.message);
				vm.message = {};
			})
			.catch(err => {
				if (err.status == 401) {
					$window.sessionStorage.removeItem('token');
				}

				console.error(err);
			});
	};

  
	vm.filter = color => vm.color = color;
}


export default ChatController;

