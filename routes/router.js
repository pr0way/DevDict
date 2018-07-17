const express = require('express')
const router = express.Router()

// Import model
let NewWord = require('../models/NewWord.js');

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

// Index page
router.get('/', (req, res) => res.render('pages/index'));

// Dictionary page
router.get('/dictionary', (req, res) => {

  NewWord.find({}, function(err, item) {

      let list = {
          one: item.filter(item => item.category == 1),
          two: item.filter(item => item.category == 2),
          three: item.filter(item => item.category == 3),
          four: item.filter(item => item.category == 4)
      }

      res.render('pages/listItem', { vars: list })
  
    });

})

// Contact page
router.get('/contact', (req, res) => res.render('pages/contact'));



module.exports = router