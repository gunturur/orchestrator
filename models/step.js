const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
});

module.exports = mongoose.model('step', stepSchema);
