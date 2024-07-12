const Quiz = require('../models/quiz');

// Controller pour obtenir tous les quiz
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour créer un nouveau quiz
const createQuiz = async (req, res) => {
    const quiz = new Quiz(req.body);
    try {
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour obtenir un quiz spécifique
const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour mettre à jour un quiz existant
const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour supprimer un quiz existant
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour obtenir un quiz aléatoire par chapitre
const getRandomQuizByChapter = async (req, res) => {
    const chapitreId = req.params.chapitreId;
    try {
        const quizzes = await Quiz.find({ chapitre: chapitreId });
        if (quizzes.length === 0) {
            return res.status(404).json({ message: 'No quizzes found for this chapter' });
        }
        const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        res.status(200).json(randomQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllQuizzes,
    createQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    getRandomQuizByChapter
};
