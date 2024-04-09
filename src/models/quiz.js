const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSCHEMA = new Schema({
    nom: {type : String, required: true },
    description : {type : String, required: true},
    matiere: {type : mongoose.Schema.Types.ObjectId, ref: 'Matière', required : true},
    nombreQuestions : {type : Number, required : true},
});

module.exports = mongoose.model('Quiz', quizSCHEMA);