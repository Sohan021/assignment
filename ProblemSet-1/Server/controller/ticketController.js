const Ticket = require('../model/Ticket')
const { serverError, resourceError } = require('../util/error')
const { networkInterfaces } = require('os');
var moment = require('moment');


module.exports = {

    createTicket(req, res) {

        const nets = networkInterfaces();
        var results = Object.create(null);

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results = net.address
                }
            }
        }

        let date_obj = new Date()

        let userId = req.body.userId
        let date = "UTC time " + date_obj
        let deviceId = results
        let queryText = req.body.queryText

        var deviceReqstList = [];
        var dateSort = { date: -1 }

        Ticket.find().sort(dateSort)
            .then(users => {
                users.forEach(u => {
                    if (u.userId == userId) {
                        deviceReqstList.push(u.date)
                    }
                })

                var a = deviceReqstList[0]

                var then = moment(a, "YYYY-MM-DD'T'HH:mm:ss:SSSZ")
                var now = date

                var difff = moment.duration(moment(now).diff(moment(then)));
                var minutes = parseInt(difff.asMinutes());

                Ticket.findOne({ deviceId })
                    .then(user => {
                        if (user && (minutes < 30)) {
                            return resourceError(res, 'You have already placed a support ticket. Please wait at least one hour before sending another request')
                        } else {
                            let ticket = new Ticket({
                                userId,
                                date,
                                deviceId,
                                queryText
                            })
                            ticket.save()
                                .then(ticket => {
                                    res.status(200).json({
                                        message: "Successfull",
                                        ticket
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        message: "Error"
                                    })
                                })
                        }
                    })
                    .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
    }
}