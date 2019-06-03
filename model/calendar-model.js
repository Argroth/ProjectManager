const mongoose = require('mongoose');

const calendarSchema = mongoose.Schema({
   day: Date,
   name: String,
   offWork: {type: Boolean, default: false},
   description: String
});


module.exports = mongoose.model('Calendar', calendarSchema);