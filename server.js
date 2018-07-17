const express = require('express');
const dotenv = require('dotenv').config()

const Router = require('./routes/router.js')

// Basic configuration
const app = express();
const port = process.env.APP_PORT || 8080

// Setup router
app.use(Router)

// Run server
app.listen(port, () => console.log(`Server started on ${port}`));