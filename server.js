const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const i18n = require('i18next');
const i18nFsBackend = require('i18next-node-fs-backend');
const i18nMiddleware = require('i18next-express-middleware');
const dotenv = require('dotenv').config()

const BasicRouter = require('./routes/basic');
const ItemRouter = require('./routes/item');

// Basic configuration
const app = express();
const port = process.env.APP_PORT || 8080;
const db = mongoose.connection;

// Body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// PUT & DELETE requests
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// View engine
app.set('view engine', 'ejs');

// Translate module
i18n
  .use(i18nFsBackend)
  .use(i18nMiddleware.LanguageDetector) // Language switcher - comment to EN, uncomment to PL
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'pl'],
    saveMissing: true
  });

app.use(i18nMiddleware.handle(i18n));

// Static files
app.use(express.static('public'))

// Connect to Mongo
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log('Mongo established connection')

    // Setup routers
    app.use('/', BasicRouter)
    app.use('/item', ItemRouter)

});

// Run server
app.listen(port, () => console.log(`Server started on ${port}`));