// Importer express
const express = require('express');

// Importer les contrôleurs
const {
    getAllMatieres,
    createMatiere,
    getMatiere,
    updateMatiere,
    deleteMatiere
} = require('../controllers/matiereControllers');

// Créer un routeur express
const router = express.Router();

// Définir les routes
router.get('/', getAllMatieres); // Obtenir toutes les matières
router.post('/create', createMatiere); // Créer une nouvelle matière
router.get('/:id', getMatiere); // Obtenir une matière spécifique
router.put('/:id', updateMatiere); // Mettre à jour une matière existante
router.delete('/:id', deleteMatiere); // Supprimer une matière existante

// Exporter le routeur
module.exports = router;
