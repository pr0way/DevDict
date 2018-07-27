const express = require('express')
const router = express.Router()

// Import model
let NewWord = require('../models/NewWord.js');

// Temporary menu
let menu = [ 'home', 'dictionary', 'contact' ]


/*
@desc: View item
@route: /item/:id
*/
router.get('/:id', (req, res) => {
  NewWord.findById(req.params.id, (err, results) =>  res.render('pages/viewItem', { title: req.t('item.view.title'), menu: menu, vars: results }));
})

/*
@desc: New word form
@route: /item/
*/
router.get('/', (req, res) => {
  res.render("pages/addItem", { title: req.t('item.add.title'), menu: menu });
}) 

/*
@desc: Add new item
@route: /item/add
*/
router.post('/add', (req, res) => {

  if(req.body.word == '' || req.body.desc == ''){

      res.status(500).send('Fill all fields!')

  } else {
  
      let data = new NewWord({ word: req.body.word, category: req.body.category, description: req.body.desc })
      data.save()

      res.redirect(`/item/${data.id}`);

  }

})

/*
@desc: Edit word form
@route: /item/:id/edit
*/
router.get('/:id/edit', (req, res) => {
  NewWord.findById(req.params.id, (err, results) => res.render('pages/editItem', { title: req.t('item.edit.title'), menu: menu, vars: results }));
})

/*
@desc: Update item
@route: /item/:id
*/
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

/*
@desc: Delete item
@route: /item/:id
*/
router.delete('/:id', (req, res) => {

  NewWord.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  
})

module.exports = router