const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workflowSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});


module.exports = mongoose.model('workflow', workflowSchema);

module.exports.createIndexes = () => {
  mongoose.model('workflow').createIndex({ name: 1 }, { unique: true });
}

