const Ticket = require('../model/Ticket')
const { serverError, resourceError } = require('../util/error')
var os = require('os');
var requestIp = require('request-ip');
const { networkInterfaces } = require('os');


module.exports = {
    createTicket(req, res) {

        // var clientIp = requestIp.getClientIp(req);
        // console.log("**+++++++++++++++++++++**: ", clientIp.toString())


        // var networkInterfaces = os.networkInterfaces()
        // console.log("********************************", networkInterfaces);
        // let nonLocalInterfaces = {};
        // for (let inet in networkInterfaces) {
        //     let addresses = networkInterfaces[inet];
        //     for (let i = 0; i < addresses.length; i++) {
        //         let address = addresses[i];
        //         if (!address.internal) {
        //             if (!nonLocalInterfaces[inet]) {
        //                 nonLocalInterfaces[inet] = [];
        //             }
        //             nonLocalInterfaces[inet].push(address);
        //         }
        //     }
        // }
        // console.log("********************************", nonLocalInterfaces);


        const nets = networkInterfaces();
        var results = Object.create(null);

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    // results[name].push(net.address);
                    // console.log("********************************", net.address);
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

        Ticket.findOne({ deviceId })
            .then(user => {
                var us = user
                console.log("++++++++", us)
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