const mongoose = require('mongoose');


const songSchema = new mongoose.Schema({
    song_name: String,
    band: String,
    year: String,
});

module.exports = mongoose.model('Song', songSchema);

