const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSCHEMA = new Schema({
    text: {type : String, required: true },
    options: {type : [String], required : true},
    answer : {type : String, required: true},
    correction : {type : String, required : false}
});

module.exports = mongoose.model('Questions', questionSCHEMA);