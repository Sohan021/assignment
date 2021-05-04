const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router/route')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/support', router)

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    })
})


const PORT = process.env.PORT || 4000

// app.listen(PORT, () => {
//     console.log(`Server is running on PORT: ${PORT}`)
//     mongoose.connect('mongodb://localhost:27017/ticket',
//         { useNewUrlParser: true, useUnifiedTopology: true },
//         () => {
//             console.log("Database Connected")
//         }
//     )
// })

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
    mongoose.connect('mongodb+srv://sohan-admin:sohan123@cluster0.cmynm.mongodb.net/ticket?retryWrites=true&w=majority',
        () => {
            console.log("Database Connected")
        });
})