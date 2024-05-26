const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionsRoutes = require('./routes/questionsRoutes');
const matiereRoutes = require('./routes/matiereRoutes');
const chapitreRoutes = require('./routes/chapitreRoutes');
const quizRoutes = require('./routes/quizRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

// start the server


app.get('/', (req, res) => {
    res.send('Le début du commencement du Quiz de Yanis et Wail');
});


app.use('/api/questions', questionsRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/matiere', matiereRoutes);
app.use('/api/chapitre', chapitreRoutes);
app.use('/api/user', userRoutes);


// check if MONGO_URI is defined 
if (!process.env.MONGO_URI) { 
    console.error("MONGOURL must be defined"); process.exit(1); 
}


mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server is running on PORT', process.env.PORT);
        });
    }) 
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err);
    });







