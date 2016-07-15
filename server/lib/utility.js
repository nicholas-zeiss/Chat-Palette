var bcrypt = require('bcryptjs');

exports.checkUser = function(req, res, next) {
	if (!req.session) {
		res.redirect('/login');
	} else {
		next();
	}
}

exports.comparePasswords = function(pass, hash) {
	return bcrypt.compareSync(pass, hash);
}

exports.createSession = function(req, res, user) {
	return req.session.regenerate(function() {
		req.session.user = user;
	})
}