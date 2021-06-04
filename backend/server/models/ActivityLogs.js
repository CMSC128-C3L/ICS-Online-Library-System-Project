const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  user_id: String,
  log_date:[{
    login:{
      type: Date,
      required: true
    },
    logout:{
      type: Date
    }
  }],
  doc_count: Number,
  doc_log:[{
    doc_oid: String,
    date: Date,
    status: String
  }]

},
{collection: 'ActivityLogs'}
);

const Logs = mongoose.model("Logs", logSchema);

module.exports = Logs;