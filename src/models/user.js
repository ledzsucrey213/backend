const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSCHEMA = new Schema({
    username: {type : String, required: true },
    email : {type : String, required: true},
    password : {type : String, required : true},
    nom : {type : String, required : false},
    prenom : {type : String, required : false},
});

module.exports = mongoose.model('User', userSCHEMA)