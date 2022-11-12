const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const DrinkRoutes = require('./routes/drink')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'))

app.use((req, res, next) => {
            console.log(req.path, req.method)
            next()
})

app.use('/api/drink', DrinkRoutes)

mongoose.connect(process.env.MONG_URI)
            .then(() => {
                        app.listen(process.env.PORT || 5000, () => {
                                    console.log('listening on port: ', process.env.PORT)
                                    console.log('connected to mongoDB')
                        })
            })
            .catch((error) => {
                        console.log(error)
            })

