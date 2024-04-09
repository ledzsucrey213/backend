const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matiereSCHEMA = new Schema({
    nom : {type : String, required: true },
    nombreQuiz : {type : Number, required: true}
});

module.exports = mongoose.model('Matière', matiereSCHEMA);