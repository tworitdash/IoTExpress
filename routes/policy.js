module.exports = {
	isLoggedin: function (req, res, next) {
		// body...
		console.log(req.session);
		if (req.session.user) next();
		else res.redirect('/login');

	}
}