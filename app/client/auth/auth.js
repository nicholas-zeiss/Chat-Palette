/**
 *
 *  Authorization controller for login and sign up pages. Handles submission of login/sign up details.
 *  If successful, the controller sets the session token and username onto the window's sessionStorage
 *  and routes us to the chat view. If unsuccessful, the controller removes the token should one already exist.
 *
**/ 
 

function AuthController($window, $location, serverCalls) {
	const vm = this;


	vm.login = () => {
		serverCalls
			.login(vm.user)
			.then(res => {
				$window.sessionStorage.setItem('token', res.token);
				$window.sessionStorage.setItem('username', vm.user.username);
				$location.path('/chat');
			})
			.catch(err => {
				$window.sessionStorage.clear();
				console.error(err);
			});
	};


	vm.signUp = () => {
		serverCalls
			.signUp(vm.user)
			.then(res => {
				$window.sessionStorage.setItem('token', res.token);
				$window.sessionStorage.setItem('username', vm.user.username);
				$location.path('/chat');
			})
			.catch(err => {
				$window.sessionStorage.clear();
				console.error(err);
			});
	};
}


export default AuthController;

