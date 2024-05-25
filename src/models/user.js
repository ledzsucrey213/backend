const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSCHEMA = new Schema({
    username: {type : String, required: true },
    email : {type : String, required: true, unique: true},
    password : {type : String, required : true},
    nom : {type : String, required : false},
    prenom : {type : String, required : false},
});


// static signup method
userSCHEMA.statics.signup = async function(username, email, password) {

    // validation
    if (!username ||!email || !password) {
        throw Error('Tous les champs doivent être complétés')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email non valide')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Mot de passe pas assez puissant')
    }
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email déjà utilisé')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password : hash })

    return user
}

// static login method
userSCHEMA.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('Tous les champs doivent être complétés')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Email incorrect')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Mot de passe incorrect")
    }

    return user


}

module.exports = mongoose.model('User', userSCHEMA)