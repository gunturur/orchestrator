const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('step', stepSchema);
