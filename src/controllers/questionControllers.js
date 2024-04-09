// Importer le modèle de question
const Question = require('../models/questions');

// Controller pour obtenir toutes les questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour créer une nouvelle question
const createQuestion = async (req, res) => {
    const question = new Question(req.body);
    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour obtenir une question spécifique
const getQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour mettre à jour une question existante
const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour supprimer une question existante
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour mettre à jour partiellement une question existante (par exemple, pour ajouter la correction)
const updateQuestionPartial = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllQuestions,
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    updateQuestionPartial
}