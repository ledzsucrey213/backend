const Score = require('../models/score');

// Controller pour obtenir tous les scores
const getAllScores = async (req, res) => {
    try {
        const scores = await Score.find();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour créer un nouveau score
const createScore = async (req, res) => {
    const score = new Score(req.body);
    try {
        const newScore = await score.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour obtenir un score spécifique
const getScore = async (req, res) => {
    try {
        const score = await Score.findById(req.params.id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        res.json(score);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour mettre à jour un score existant
const updateScore = async (req, res) => {
    try {
        const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        res.json(score);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour supprimer un score existant
const deleteScore = async (req, res) => {
    try {
        const score = await Score.findByIdAndDelete(req.params.id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        res.json({ message: 'Score deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllScores,
    createScore,
    getScore,
    updateScore,
    deleteScore
};
