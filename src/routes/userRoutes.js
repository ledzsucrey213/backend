// Importer express
const express = require('express');

// Importer les contrôleurs
const {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    signupUser,
    loginUser
} = require('../controllers/userControllers');

// Créer un routeur express
const router = express.Router();

// Définir les routes
router.get('/', getAllUsers); // Obtenir tous les utilisateurs
router.get('/:id', getUser); // Obtenir un utilisateur spécifique
router.put('/:id', updateUser); // Mettre à jour un utilisateur existant
router.delete('/:id', deleteUser); // Supprimer un utilisateur existant
router.post('/signup', signupUser); // Créer un nouvel utilisateur
router.post('/login', loginUser); 


// Exporter le routeur
module.exports = router;
