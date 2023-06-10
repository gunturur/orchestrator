const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
  steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }]
});

module.exports = mongoose.model('task', taskSchema);
