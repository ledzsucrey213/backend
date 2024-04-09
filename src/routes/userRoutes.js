// Importer express
const express = require('express');

// Importer les contrôleurs
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userControllers');

// Créer un routeur express
const router = express.Router();

// Définir les routes
router.get('/', getAllUsers); // Obtenir tous les utilisateurs
router.post('/create', createUser); // Créer un nouvel utilisateur
router.get('/:id', getUser); // Obtenir un utilisateur spécifique
router.put('/:id', updateUser); // Mettre à jour un utilisateur existant
router.delete('/:id', deleteUser); // Supprimer un utilisateur existant

// Exporter le routeur
module.exports = router;
