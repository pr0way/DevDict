var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('words', wordSchema);          