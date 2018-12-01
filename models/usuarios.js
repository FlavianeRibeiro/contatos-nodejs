

module.exports = function(){
	var mongoose = require("mongoose");
	var usuario = mongoose.Schema({
		nome     : {type: String},
		email    : {type: String},
		senha : {type: String},
		data_cad : {type: Date, default: Date.now}
	});

	return mongoose.model('Usuarios',usuario);
}