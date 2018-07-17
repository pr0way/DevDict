const express = require('express')
const router = express.Router()

// Import model
let NewWord = require('../models/NewWord.js');

// Document root
router.get('/', function (req, res) {
  res.send('Test')
})

// #################################################

// Item form
router.get('/item', (req, res) => {
  res.render("pages/formItem");
}) 

// Add item
router.post('/item', (req, res) => {

  if(req.body.word == '' || req.body.desc == ''){
      res.status(500).send('Fill all fields!')
  } else {
  
      let data = new NewWord({ word: req.body.word, category: req.body.category, description: req.body.desc })
      data.save()

      res.redirect(`/item/${data.id}`);
  }
})

// View item
router.get('/item/:id', (req, res) => {
  NewWord.findById(req.params.id, (err, results) =>  res.render('pages/viewItem', { vars: results }));
})

// Update item
router.put('/item/:id', (req, res) => {

  NewWord.findById(req.params.id, function (err, item) {
    
      item.word = req.body.word;
      item.category = req.body.category;
      item.description = req.body.desc;

      item.save(function (err, updatedItem) {
          res.redirect(`/item/${updatedItem._id}`);
      });
  });

})

// Delete item
router.delete('/item/:id', (req, res) => {

  NewWord.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  
})

// #############################################

// Contact
router.get('/contact', function (req, res) {
  res.render('pages/contact')
})



module.exports = router