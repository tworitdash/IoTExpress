var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.conenct(config.db);
	return db;

	// body...
}