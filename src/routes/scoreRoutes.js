// Importer express
const express = require('express');

// Importer les contrôleurs
const {
    getAllScores,
    createScore,
    getScore,
    updateScore,
    deleteScore
} = require('../controllers/scoreControllers');

// Créer un routeur express
const router = express.Router();

// Définir les routes
router.get('/', getAllScores); // Obtenir tous les scores
router.post('/create', createScore); // Créer un nouveau score
router.get('/:id', getScore); // Obtenir un score spécifique
router.put('/:id', updateScore); // Mettre à jour un score existant
router.delete('/:id', deleteScore); // Supprimer un score existant

// Exporter le routeur
module.exports = router;

