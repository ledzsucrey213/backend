// Importer express
const express = require('express');

// Importer les contrôleurs
const {
    getAllQuizzes,
    createQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz
} = require('../controllers/quizControllers');

// Créer un routeur express
const router = express.Router();

// Définir les routes
router.get('/', getAllQuizzes); // Obtenir tous les quiz
router.post('/create', createQuiz); // Créer un nouveau quiz
router.get('/:id', getQuiz); // Obtenir un quiz spécifique
router.put('/:id', updateQuiz); // Mettre à jour un quiz existant
router.delete('/:id', deleteQuiz); // Supprimer un quiz existant

// Exporter le routeur
module.exports = router;
