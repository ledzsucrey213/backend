const Chapitre = require('../models/chapitre');

// Controller pour obtenir tous les chapitres
const getAllChapitres = async (req, res) => {
    try {
        const chapitres = await Chapitre.find();
        res.status(200).json(chapitres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller pour créer un nouveau chapitre
const createChapitre = async (req, res) => {
    const chapitre = new Chapitre(req.body);
    try {
        const newChapitre = await chapitre.save();
        res.status(201).json(newChapitre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour obtenir un chapitre spécifique
const getChapitre = async (req, res) => {
    try {
        const chapitre = await Chapitre.findById(req.params.id);
        if (!chapitre) {
            return res.status(404).json({ message: 'Chapitre not found' });
        }
        res.json(chapitre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller pour mettre à jour un chapitre existant
const updateChapitre = async (req, res) => {
    try {
        const chapitre = await Chapitre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!chapitre) {
            return res.status(404).json({ message: 'Chapitre not found' });
        }
        res.json(chapitre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller pour supprimer un chapitre existant
const deleteChapitre = async (req, res) => {
    try {
        const chapitre = await Chapitre.findByIdAndDelete(req.params.id);
        if (!chapitre) {
            return res.status(404).json({ message: 'Chapitre not found' });
        }
        res.json({ message: 'Chapitre deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller pour obtenir les chapitres d'une matière spécifique
const getChapitresByMatiere = async (req, res) => {
    const matiereId = req.params.matiereId;
    try {
        const chapitres = await Chapitre.find({ matiere: matiereId });
        if (chapitres.length === 0) {
            return res.status(404).json({ message: 'Aucun chapitre trouvé pour cette matière' });
        }
        res.json(chapitres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllChapitres,
    createChapitre,
    getChapitre,
    updateChapitre,
    deleteChapitre,
    getChapitresByMatiere
};

