const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapitreSCHEMA = new Schema({
    nom : {type : String, required: true },
    nombreQuiz : {type : Number, required: true},
    matiere: {type : mongoose.Schema.Types.ObjectId, ref: 'Matière', required : true}
});

module.exports = mongoose.model('Chapitre', chapitreSCHEMA);