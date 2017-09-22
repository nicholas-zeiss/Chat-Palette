/**
 *
 *  Authorization controller for login and sign up pages. Handles submission of login/sign up details.
 *  If successful, the controller sets the token onto the window's sessionStorage and routes us to the chat view.
 *  If unsuccessful, the controller removes the token should one already exist.
 *
**/ 
 

function AuthController($window, $location, serverCalls) {
	const vm = this;


	vm.login = () => {
		serverCalls
			.login(vm.user)
			.then(res => {
				$window.sessionStorage.setItem('token', res.token);
				$location.path('/chat');
			})
			.catch(err => {
				$window.sessionStorage.removeItem('token');
				console.error(err);
			});
	};


	vm.signUp = () => {
		serverCalls
			.signUp(vm.user)
			.then(res => {
				$window.sessionStorage.setItem('token', res.token);
				$location.path('/chat');
			})
			.catch(err => {
				$window.sessionStorage.removeItem('token');
				console.error(err);
			});
	};
}


export default AuthController;

