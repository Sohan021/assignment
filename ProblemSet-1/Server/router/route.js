const router = require('express').Router()
const { createTicket } = require('../controller/ticketController')

router.post('/create_ticket', createTicket)

module.exports = router

