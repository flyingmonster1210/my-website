const mongoose = require('mongoose')

// create a schema (a model)
const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
  },
  time: {
    type: String,
  },
  introduction: {
    type: String,
  },
  description: {
    type: String,
  },
  URL: {
    type: String,
  },
}, {
  timestamps: true
})

// a model's collection connect to the db, 
// by this we can perform read, update, delete, create 
module.exports = mongoose.model('Project', projectSchema, 'projects')











