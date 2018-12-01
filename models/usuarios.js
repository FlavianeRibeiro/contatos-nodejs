
module.exports = function(){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema();
	var usuario = Schema({
		nome     : {type: String, trim: true},
		email    : {type: String, trim: true, unique: true, index: true},
		senha : {type: String},
		data_cad : {type: Date, default: Date.now}
	});

	return mongoose.model('Usuarios',usuario);
}