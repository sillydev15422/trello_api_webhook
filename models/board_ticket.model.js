var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  name: String,
  email: string,
  password: string,
});

var Board_Ticket = mongoose.model('Board_Ticket', Board_TicketSchema);
module.exports = Board_Ticket;
