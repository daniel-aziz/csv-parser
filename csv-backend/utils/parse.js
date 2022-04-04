const fs = require('fs');
const csv = require('csv-parser');
const SongModel = require('../models/songSchema');


const parseSongsAndSave = () => {
    var records = [];

    // parse data from csv file
    fs.createReadStream(process.cwd() + '/data/song_list.csv')
        .pipe(csv())
        .on('data', (data) => {
            try {
                // parse data to lower case
                const parsedData = parseData(data);

                // push the data object into the records array 
                records.push(parsedData);
            }
            catch (err) {
                console.log(err)
            }
        })
        .on('end', () => {
            try {
                saveToDatabase(records);
            } catch (err) {
                console.log(err)
            }
        });
}

// remove any records that are stored in the DB 
// and save many recors of recived data
const saveToDatabase = async (data) => {
    try {
        await SongModel.deleteMany({});
        await SongModel.insertMany(data);
    } catch (err) {
        throw new Error(err.toString());

    }
}



const parseData = (data) => {
    // convert all the characters in the data to lowercase
    data = JSON.parse(JSON.stringify(data).toLowerCase());

    // if a key in the object has a space character
    // it will trim it and replace the space with '_' (if not in the edge)
    Object.keys(data).forEach((key) => {
        var replacedKey = key.trim().replace(' ', '_');
        if (key !== replacedKey) {
            data[replacedKey] = data[key];
            delete data[key];
        }
    });

    return data;
}

module.exports = { parseSongsAndSave };