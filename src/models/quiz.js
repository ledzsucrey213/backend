const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSCHEMA = new Schema({
    nom: {type : String, required: true },
    questions : {type : [mongoose.Schema.Types.ObjectId], required: true},
    chapitre: {type : mongoose.Schema.Types.ObjectId, ref: 'Chapitre', required : true},
    nombreQuestions : {type : Number, required : true},
});

module.exports = mongoose.model('Quiz', quizSCHEMA);