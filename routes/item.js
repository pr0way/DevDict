const express = require('express')
const router = express.Router()

// Import model
let NewWord = require('../models/NewWord.js');

// Temporary menu
let menu = [ 'home', 'dictionary', 'contact' ]

// Item form
router.get('/', (req, res) => {
  res.render("pages/formItem", { title: req.t('item.add.title'), menu: menu });
}) 

// Add item
router.post('/', (req, res) => {

  if(req.body.word == '' || req.body.desc == ''){
      res.status(500).send('Fill all fields!')
  } else {
  
      let data = new NewWord({ word: req.body.word, category: req.body.category, description: req.body.desc })
      data.save()

      res.redirect(`/item/${data.id}`);
  }
})

// View item
router.get('/:id', (req, res) => {
  NewWord.findById(req.params.id, (err, results) =>  res.render('pages/viewItem', { title: req.t('item.view.title'), menu: menu, vars: results }));
})

// Update item
router.put('/:id', (req, res) => {

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
router.delete('/:id', (req, res) => {

  NewWord.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  
})

module.exports = router