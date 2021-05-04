const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    date: {
        type: Date,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },
    queryText: {
        type: String,
        required: true,
        trim: true
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket