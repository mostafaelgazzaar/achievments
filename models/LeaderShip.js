
const mongoose = require('mongoose');
const { AchievementLabel } = require('../data/types')


const LeadershipSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    game: { type: String, required: true },
    level: { type: Number, required: true },
    label: { type: String, enum: AchievementLabel },
    dateTime: { type: Date, default: Date.now },
    time: { type: Number, required: true },
    badge: {
        type: String, default: function () {
            if (this.score >= 75 && this.score <= 100) {
                this.label = "SuperGold";
                return 'SuperGold.png'
            }
            else if (this.score >= 50 && this.score < 75) {
                this.label = "Gold";
                return 'Gold.png'
            }
            else if (this.score >= 25 && this.score < 50) {
                this.label = "Silver";
                return 'Silver.png'

            }
            else if (this.score >= 15 && this.score < 25) {
                this.label = "Bronze";
                return 'Bronze.png'
            }
            else if (this.score >= 0 && this.score < 15) {
                this.label = "Empty";
                return 'Empty.png'
            }
        }
    }
});

LeadershipSchema.pre('updateOne', function (next) {
    let label, badge;
    const score = this._update.score;
    if (score >= 75 && score <= 100) {
        label = "SuperGold";
        badge = 'SuperGold.png'
    }
    else if (score >= 50 && score < 75) {
        label = "Gold";
        badge = 'Gold.png'
    }
    else if (score >= 25 && score < 50) {
        label = "Silver";
        badge = 'Silver.png'

    }
    else if (score >= 15 && score < 25) {
        label = "Bronze";
        badge = 'Bronze.png'
    }
    else if (score >= 0 && this.score < 15) {
        label = "Empty";
        badge = 'Empty.png'
    }
    this.updateOne({}, { $set: { label: label, badge: badge } });

    next();
});


module.exports = mongoose.model(
    'leaderships', LeadershipSchema, 'leaderships');