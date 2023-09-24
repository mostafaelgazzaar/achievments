
const mongoose = require('mongoose');
const { AchievementLabel, AchievementType } = require('../data/types')


const AchievementSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    game: { type: String, required: true },
    level: { type: Number, required: true },
    dateTime: { type: Date, default: Date.now },
    time: { type: Number, required: true },

});


module.exports = mongoose.model(
    'achievements', AchievementSchema, 'achievements');

