const mongoose = require('mongoose')

const Schema = mongoose.Schema


const drinkSchema = new Schema({
            drinkName: {
                        type: String,
                        required: true
            },
            typOfDrink: {
                        type: String,
                        required: true
            },
            price: {
                        type: Number,
                        required: true
            },
            imageName: {
                        type: String,
                        required: true
            }
}, { timestamps: true })

module.exports = mongoose.model('DrinkList', drinkSchema)