const express = require('express')
const router = express.Router()

// Import model
let NewWord = require('../models/NewWord.js');

// Document root
router.get('/', function (req, res) {
  res.send('Test')
})

// Contact
router.get('/contact', function (req, res) {
  res.render('pages/contact')
})



module.exports = router