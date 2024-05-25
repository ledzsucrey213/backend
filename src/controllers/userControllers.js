const User = require('../models/user');
const jwt = require('jsonwebtoken')


// fonction pour créer un token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn : '3d'})
}


// Controller pour obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller pour obtenir un utilisateur spécifique
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour mettre à jour un utilisateur existant
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour supprimer un utilisateur existant
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login user
const loginUser = async (req,res) => {

    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        // créer un token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }

    
}

// signup user
const signupUser = async (req, res) => {
    const { username, email, password, nom, prenom, numero, adresse } = req.body;

    try {
        const user = await User.signup(username, email, password, nom, prenom, numero, adresse);

        // créer le token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    signupUser
};