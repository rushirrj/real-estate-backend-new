const express = require('express');
const router = express.Router();
const jwtGenerator = require('../utils/jwtGenerator');
const authorisation = require('../middlewares/authorisation');
const User = require('../models/User')

router.post("/register", async(request, response) => {
    console.log(request.body);
    try {

        const { username, password } = request.body;

        const user = await User.create(request.body);
        console.log(user);
        return response.json(user);

    } catch (err) {
        console.log(err.message);
        response.status(500).send("server error");
    }
});


router.post('/login', async(request, response) => {

    try {
        console.log(request.body);
        const { username, password } = request.body;
        console.log(password);
        // const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

        const user = await User.findOne({ username: username });
        console.log(user, "here");
        if (user.password !== password) {
            return response.status(401).send("Username or Password Incorrect");
        }
        const token = jwtGenerator(username);
        return response.status(200).json({ token });

    } catch (err) {
        response.set(401).send(err.message);
    }
});

router.get("/verify", authorisation, async(request, response) => {
    try {
        response.json(true);
    } catch (err) {
        console.log(err);
        response.set(500).send(err);
    }
});

module.exports = router;