const express = require('express')
const router = express.Router()

// Import model
let NewWord = require('../models/NewWord.js');

// Temporary menu
let menu = [ 'home', 'dictionary', 'contact' ]

// Index page
router.get('/', (req, res) => res.render('pages/index', { title: req.t('home.title'), menu: menu }));

// Dictionary page
router.get('/dictionary', (req, res) => {

    NewWord.find({}, function(err, item) {
  
        let list = {
            one: item.filter(item => item.category == 1),
            two: item.filter(item => item.category == 2),
            three: item.filter(item => item.category == 3),
            four: item.filter(item => item.category == 4)
        }
  
        res.render('pages/listItem', { title: req.t('dictionary.title'), menu: menu, vars: list })
    
      });
  
})

// Contact page
router.get('/contact', (req, res) => res.render('pages/contact', { title: req.t('contact.title'), menu: menu}));

module.exports = router