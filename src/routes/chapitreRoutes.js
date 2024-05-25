// Importer express
const express = require('express');

// Importer les contrôleurs
const {
    getAllChapitres,
    createChapitre,
    getChapitre,
    updateChapitre,
    deleteChapitre,
    getChapitresByMatiere
} = require('../controllers/chapitreControllers');

// Créer un routeur express
const router = express.Router();

// Définir les routes
router.get('/', getAllChapitres); // Obtenir toutes les matières
router.post('/create', createChapitre); // Créer une nouvelle matière
router.get('/:id', getChapitre); // Obtenir une matière spécifique
router.get('/matiere/:matiereId', getChapitresByMatiere);
router.put('/:id', updateChapitre); // Mettre à jour une matière existante
router.delete('/:id', deleteChapitre); // Supprimer une matière existante

// Exporter le routeur
module.exports = router;
