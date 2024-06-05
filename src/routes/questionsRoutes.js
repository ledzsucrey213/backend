// src/routes/questionsRoutes.js

const express = require('express');
const {
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
} = require('../controllers/questionControllers');

const router = express.Router();

router.post('/upload-pdf', upload.single('pdf'), handlePdfUploadAndGenerateQuestions);

router.get('/', getAllQuestions);
router.get('/:chapitreId', getAllQuestionsByChapter);
router.post('/', createQuestion);
router.post('/multiple', createMultipleQuestions);
router.get('/:id', getQuestion);
router.put('/:id', updateQuestion);
router.patch('/:id', updateQuestionPartial);
router.delete('/:id', deleteQuestion);
router.get('/random/:chapitreId', getRandomQuestion);

module.exports = router;


