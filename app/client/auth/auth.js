/**
 *
 *  Authorization controller for login and sign up pages. Handles submission of login/sign up details.
 *  If successful, the controller sets the session token and username onto the window's sessionStorage
 *  and routes us to the chat view. If unsuccessful, the controller removes the token should one already exist.
 *
**/ 
 

function AuthController($window, $location, serverCalls) {
	//if already authenticated route directly to chat view
	if ($window.sessionStorage.getItem('token') && $window.sessionStorage.getItem('token')) {
		$location.path('/chat');
	}


	const errMessages = {
		400: 'That username is already in use',
		404: 'Invalid username/password',
		500: 'Server is unable to sign you up'
	};


	const vm = this;

	vm.errorMsg = null;


	vm.resetError = () => {
		vm.errorMsg = null;
	};


	const success = res => {
		$window.sessionStorage.setItem('token', res.token);
		$window.sessionStorage.setItem('username', vm.user.username);
		
		$location.path('/chat');
	};


	const failure = err => {
		$window.sessionStorage.clear();
		
		vm.errorMsg = errMessages[err.status];
		vm.user = null;
		
		console.error(err);
	};


	vm.login = () => {
		serverCalls
			.login(vm.user)
			.then(success, failure);
	};


	vm.signUp = () => {
		serverCalls
			.signUp(vm.user)
			.then(success, failure);
	};
}


export default AuthController;

