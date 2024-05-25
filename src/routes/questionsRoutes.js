// Importer express
const express = require('express')

// Importer les contrôleurs
const {
    getAllQuestions,
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    updateQuestionPartial,
    getRandomQuestion
} = require('../controllers/questionControllers');

// Créer un routeur express
const router = express.Router();

// Définir les routes
router.get('/', getAllQuestions); // Obtenir toutes les questions
router.get('/random/:chapitreId', getRandomQuestion);
router.post('/create', createQuestion); // Créer une nouvelle question
router.get('/:id', getQuestion); // Obtenir une question spécifique
router.put('/:id', updateQuestion); // Mettre à jour une question existante
router.delete('/:id', deleteQuestion); // Supprimer une question existante
router.patch('/questions/:id', updateQuestionPartial); // Mettre à jour partiellement une question existante

// Exporter le routeur
module.exports = router;
