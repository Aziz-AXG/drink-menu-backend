const DrinkList = require('../models/DrinkModel')
const mongoose = require('mongoose')
const multer = require('multer')

const getDrink = async (req, res) => {
            const drink = await DrinkList.find({}).sort({ createdAt: -1 })

            res.status(200).json(drink)
}

const getSingleDrink = async (req, res) => {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No drink found' })
            }
            const SingleDrink = await DrinkList.findById(id)

            if (!SingleDrink) {
                        return res.status(404).json({ error: 'NO drink found' })
            }

            res.status(200).json(SingleDrink)
}
// img upload functions
const muterConfig = multer.diskStorage({
            destination: (req, file, callback) => {
                        callback(null, 'uploads/')
            },
            filename: (req, file, callback) => {
                        callback(null, file.originalname)
            }
})

const isImage = (req, file, callback) => {
            if (file.mimetype.startsWith('image')) {
                        callback(null, true)
            } else {
                        callback(new Error('Only Image is Allowed...'))
            }
}

const upload = multer({ storage: muterConfig, fileFilter: isImage, })

const uploadImage = upload.single('image')


// post req
const createDrink = (req, res) => {
            const drinkList = new DrinkList({
                        drinkName: req.body.drinkName,
                        typOfDrink: req.body.typOfDrink,
                        price: req.body.price,
                        imageName: req.file.path
            })

            drinkList.save()
                        .then(() => res.json({ done: 'New drink has been add' }))
                        .catch((error) => res.status(400).json(`pls Add ${error}`))


}

const deleteDrink = async (req, res) => {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: "No drink found" })
            }

            const drink = await DrinkList.findOneAndDelete({ _id: id })

            if (!drink) {
                        return res.status(404).json({ error: 'No drink found' })
            }

            res.status(200).json(drink)

}

const updateDrink = async (req, res) => {
            const { id } = req.params

            if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No drink found' })
            }

            const drink = await DrinkList.findByIdAndUpdate({ _id: id }, {
                        ...req.body
            })

            if (!drink) {
                        return res.status(404).json({ error: 'No drink found' })
            }

            res.status(200).json(drink)
}

module.exports = {
            getDrink, getSingleDrink, createDrink, uploadImage, deleteDrink, updateDrink
}