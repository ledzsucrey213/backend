const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSCHEMA = new Schema({
    score: {type : Number, required: true },
    quiz : {type : [mongoose.Schema.Types.ObjectId], ref: 'Quiz', required : true},
    date : {type : Date, required : true},
    student : {type : mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
    chapitre : {type : mongoose.Schema.Types.ObjectId, ref : 'Chapitre', required : true}
});

module.exports = mongoose.model('Score', scoreSCHEMA);
