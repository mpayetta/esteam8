/**
 * Password encryption utility functions
 */

var crypto = require('crypto');

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass) {
	var salt = generateSalt();
	var hash = md5(pass + salt);
	return salt + hash;
}

var validatePassword = function(plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

exports.generateSalt = generateSalt;
exports.saltAndHash = saltAndHash;
exports.validatePassword = validatePassword;