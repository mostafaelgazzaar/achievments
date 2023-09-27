const express = require("express")
const User = require("../models/UsersSchema") // new
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        // check each property ion req.body
        if (!req.body.userName) {
            return res.status(400).send({
                message: "userName can not be empty"
            });
        }

        if (!req.body.application) {
            return res.status(400).send({
                message: "application can not be empty"
            });
        }

        // check if user exists
        const foundUser = await User.findOne({
            userName: req.body.userName,
            application: req.body.application
        });
        if (foundUser) {
            return res.status(400).send({
                message: "user already exists"
            });
        }

        const user = new User({
            userName: req.body.userName,
            application: req.body.application
        });
        await user.save();
        res.success(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router