const mongoose = require('mongoose');
const RecordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	key: {
		type: String
	},
	createdAt: {
		type: Date
	},
	counts: {
		type: Number
	},
	value: {
		type: String
	},
	totalCount: {
		type: Number
	}
	  

});

module.exports = mongoose.model('record', RecordSchema);