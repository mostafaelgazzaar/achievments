
const express = require("express")
const Achievement = require("../models/achivements") // new
const LeaderShip = require("../models/LeaderShip") // new
const router = express.Router()
const { AchievementType, AchievementLabel } = require('../data/types')


router.post('/', async (req, res) => {
    // check each property ion req.body
    if (!req.body.userName) {
        return res.status(400).send({
            message: "userName can not be empty"
        });
    }
    if (!req.body.score) {
        return res.status(400).send({
            message: "score can not be empty"
        });
    }
    if (!req.body.game) {
        return res.status(400).send({
            message: "game can not be empty"
        });
    }
    if (!req.body.level) {
        return res.status(400).send({
            message: "level can not be empty"
        });
    }
    if (!req.body.time) {
        return res.status(400).send({
            message: "time can not be empty"
        });
    }


    try {
        // check if achievement exist
        const foundAchievement = await Achievement.findOne({ userName: req.body.userName, game: req.body.game, level: req.body.level });
        if (foundAchievement) {
            const newScore = +req.body.score;
            const currentAchievement = await Achievement.updateOne({
                userName: req.body.userName,
                game: req.body.game,
                level: req.body.level
            },
                {
                    score: newScore,
                    time: req.body.time,
                    dateTime: new Date()
                });
            return res.success(currentAchievement);
        }

        const achievement = new Achievement({
            userName: req.body.userName,
            score: req.body.score,
            game: req.body.game,
            level: req.body.level,
            dateTime: new Date(),
            time: req.body.time
        });
        await achievement.save();
        res.success(achievement);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);

    }
});

router.get('/', async (req, res) => {
    try {

        const level = req.query.level;
        const game = req.query.game;
        if (!level || !game) return res.status(400).send({
            message: "level and game are required"
        });
        let achievements = await Achievement.find({ level: level, game: game }).sort({ dateTime: -1 }).lean();

        achievements = achievements.map(achievement => {
            //map each time to minutes and seconds 120 seconds => 2:00
            const minutes = Math.floor(achievement.time / 60);
            let seconds = achievement.time - minutes * 60;
            if (seconds < 10) seconds = `0${seconds}`; // add 0 if seconds less than 10 ( 2 => 02
            achievement.time = `${minutes}:${seconds}`;
            return achievement;
        });


        res.success(achievements);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/leadership', async (req, res) => {
    try {
        const game = req.query.game;
        const level = req.query.level;

        if (!game || !level) return res.status(400).send({
            message: "game, level  are required"
        });

        // find leader ship by game and level and order by score
        let leaderships = await LeaderShip.find({ level: level, game: game }).sort({ score: -1, time: -1 }).lean();

        // map each time to minutes and seconds 120 seconds => 2:00
        leaderships = leaderships.map(leaderShip => {
            const minutes = Math.floor(leaderShip.time / 60);
            let seconds = leaderShip.time - minutes * 60;
            if (seconds < 10) seconds = `0${seconds}`;
            leaderShip.time = `${minutes}:${seconds}`;
            return leaderShip;
        });
        res.success(leaderships);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post('/leadership', async (req, res) => {
    // check each property ion req.body
    if (!req.body.userName) {
        return res.status(400).send({
            message: "userName can not be empty"
        });
    }
    if (!req.body.score) {
        return res.status(400).send({
            message: "score can not be empty"
        });
    }
    if (!req.body.game) {
        return res.status(400).send({
            message: "game can not be empty"
        });
    }
    if (!req.body.level) {
        return res.status(400).send({
            message: "level can not be empty"
        });
    }
    if (!req.body.time) {
        return res.status(400).send({
            message: "time can not be empty"
        });
    }

    try {
        const foundLeaderShip = await LeaderShip.findOne({ userName: req.body.userName, game: req.body.game, level: req.body.level });
        if (foundLeaderShip) {
            const newScore = +req.body.score;
            const time = req.body.time;
            const currentLeaderShip = await LeaderShip.updateOne({
                userName: req.body.userName, game: req.body.game, level: req.body.level
            }, { score: newScore, time });
            return res.success(currentLeaderShip);
        } else {
            const leaderShip = new LeaderShip({
                userName: req.body.userName,
                score: req.body.score,
                game: req.body.game,
                level: req.body.level,
                dateTime: new Date(),
                time: req.body.time
            });
            await leaderShip.save();
            res.success(leaderShip);
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router
