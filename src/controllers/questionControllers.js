

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


// Nouveau Controller pour créer plusieurs questions à la fois
const createMultipleQuestions = async (req, res) => {
    if (!Array.isArray(req.body.questions) || req.body.questions.length === 0) {
        return res.status(400).json({ message: 'You must provide at least one question' });
    }

    try {
        const questions = await Question.insertMany(req.body.questions);
        res.status(201).json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}





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


// Controller pour obtenir une question aléatoire d'un chapitre spécifique
const getRandomQuestion = async (req, res) => {
    const chapitreId = req.params.chapitreId;
    try {
        // Trouver toutes les questions liées au chapitre spécifique
        const questions = await Question.find({ chapitre: chapitreId });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'Aucune question trouvée pour ce chapitre' });
        }

        // Sélectionner une question au hasard parmi celles liées au chapitre
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];

        res.json(randomQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllQuestionsByChapter = async (req, res) => {
    const chapitreId = req.params.chapitreId;
    try {
        // Trouver toutes les questions liées au chapitre spécifique
        const questions = await Question.find({ chapitre: chapitreId });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'Aucune question trouvée pour ce chapitre' });
        }

        // Renvoie toutes les questions liées au chapitre
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// src/controllers/questionControllers.js

const Question = require('../models/questions');
const Chapter = require('../models/chapitre');
const fs = require('fs');
const multer = require('multer');
const pdfParse = require('pdf-parse'); // Pour analyser le PDF

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/pdfs'); // Dossier où les fichiers PDF seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Fonction pour analyser le PDF et générer des questions
const generateQuestionsFromPDF = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);

  const questions = [];
  const content = data.text.split('\n').slice(0, 10); // Supposons que chaque ligne est une question

  for (let i = 0; i < 10; i++) {
    questions.push({
      text: `Question ${i + 1}: ${content[i]}`,
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      answer: 'Option 1',
      correction: 'Explanation for the answer',
    });
  }

  return questions;
};

const handlePdfUploadAndGenerateQuestions = async (req, res) => {
  const chapterId = req.body.chapterId;

  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier PDF téléchargé' });
  }

  const pdfPath = req.file.path;

  try {
    await Chapter.findByIdAndUpdate(chapterId, { pdfPath: pdfPath });

    const questions = await generateQuestionsFromPDF(pdfPath);
    const questionsWithChapterId = questions.map(question => ({
      ...question,
      chapitre: chapterId,
    }));

    const createdQuestions = await Question.insertMany(questionsWithChapterId);

    res.status(201).json({ message: 'PDF téléchargé et questions générées', questions: createdQuestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllQuestions,
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  updateQuestionPartial,
  getRandomQuestion,
  createMultipleQuestions,
  handlePdfUploadAndGenerateQuestions,
  upload,
  getAllQuestionsByChapter
};





