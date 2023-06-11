const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
  steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }],
  description: { type: String },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Task', taskSchema);
