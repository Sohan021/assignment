// const e = require("cors")
// const { default: validator } = require("validator")

// const validate = ticket => {
//     let error = {}
//     if (!ticket.UserId) {
//         error.email = 'Please Provide Your Email'
//     } else if (!validator.isEmail(ticket.email)) {
//         error.email = 'Please Provide Your Email'
//     }
//     if (!ticket.password) {
//         error.password = 'Please Provide a Password'
//     }
//     return {
//         error,
//         isValid: Object.keys(error).length == 0
//     }
// }
// module.exports = validate