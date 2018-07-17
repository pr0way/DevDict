const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const dotenv = require('dotenv').config()

const Router = require('./routes/router.js')

// Basic configuration
const app = express();
const port = process.env.APP_PORT || 8080;
const db = mongoose.connection;

// View engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'))

// Connect to Mongo
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log('Mongo established connection')

    // Setup router
    app.use(Router)

});

// Run server
app.listen(port, () => console.log(`Server started on ${port}`));