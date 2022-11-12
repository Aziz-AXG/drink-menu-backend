const express = require('express')
const { getDrink, getSingleDrink, createDrink, uploadImage, deleteDrink, updateDrink } = require('../controller/drinkController')
const router = express.Router()

router.get('/', getDrink)

router.get('/:id', getSingleDrink)

router.post('/', uploadImage, createDrink)

router.delete('/:id', deleteDrink)

router.patch('/:id', updateDrink)

module.exports = router