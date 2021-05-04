const Ticket = require('../model/Ticket')
const { serverError, resourceError } = require('../util/error')
const { networkInterfaces } = require('os');

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
        console.log("********************************", results);

        let date_obj = new Date()
        // console.log("UTC time " + date_obj)

        let userId = req.body.userId
        let date = "UTC time " + date_obj
        let deviceId = results
        let queryText = req.body.queryText

        let u = userId;

        // Ticket.find({}).toArray(function (err, result) {
        //     if (err) throw err;
        //     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&:", result);
        // });
        // const ticket = Ticket.find({ where: { userId: userId } })
        //     .then(users => {

        //         console.log("*************+++++**********", users[0])
        //     })
        //     .catch(error => serverError(res, error))
        // console.log(ticket)


        const ticket = Ticket.find()
            .then(users => {
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^", userId)
                console.log("_______________________________", users._id)
                users.map(u => {
                    console.log("uuuuuuuuuuu", u._id)
                })
                users.forEach(u => {
                    if(u.userId == userId)
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!", u.userId)
                })
                if (users)
                    console.log("*************+++++**********")
            })
            .catch(error => serverError(res, error))

        Ticket.findOne({ deviceId })
            .then(user => {
                var us = user
                //console.log("++++++++", us)
                if (user) {
                    return resourceError(res, 'You have already placed a support ticket. Please wait at least one hour before sending another request')
                } else {
                    let ticket = new Ticket({
                        userId,
                        date,
                        deviceId,
                        queryText
                    })
                    res.json(ticket)
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
    }
}