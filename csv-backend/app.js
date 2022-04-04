require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const SongModel = require('./models/songSchema.js');
const { parseSongsAndSave } = require('./utils/parse');

// Allow CORS
app.use(cors());

// Alow the server use json
app.use(express.json())

// Connect to DB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, response) => {
    if (response) {
        // invoke function to parse all cvs data and save to db; 
        parseSongsAndSave();
    }
    else if (err) {
        console.log("Not Connected to the DB");
    }
})

// API point to get all songs from the db
app.get('/api/v1/songs', async (req, res) => {
    try {
        const data = await SongModel.find();
        res.json(data).status(200);
    } catch (err) {
        res.status(400);
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`)
})