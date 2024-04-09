const Matiere = require('../models/matiere');

// Controller pour obtenir toutes les matières
const getAllMatieres = async (req, res) => {
    try {
        const matieres = await Matiere.find();
        res.status(200).json(matieres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour créer une nouvelle matière
const createMatiere = async (req, res) => {
    const matiere = new Matiere(req.body);
    try {
        const newMatiere = await matiere.save();
        res.status(201).json(newMatiere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour obtenir une matière spécifique
const getMatiere = async (req, res) => {
    try {
        const matiere = await Matiere.findById(req.params.id);
        if (!matiere) {
            return res.status(404).json({ message: 'Matiere not found' });
        }
        res.json(matiere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour mettre à jour une matière existante
const updateMatiere = async (req, res) => {
    try {
        const matiere = await Matiere.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!matiere) {
            return res.status(404).json({ message: 'Matiere not found' });
        }
        res.json(matiere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour supprimer une matière existante
const deleteMatiere = async (req, res) => {
    try {
        const matiere = await Matiere.findByIdAndDelete(req.params.id);
        if (!matiere) {
            return res.status(404).json({ message: 'Matiere not found' });
        }
        res.json({ message: 'Matiere deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMatieres,
    createMatiere,
    getMatiere,
    updateMatiere,
    deleteMatiere
};
