const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

// This POST route will help to register a user
router.post("/register", async (req, res) => {
    try {
        // This code is run when the /register api is called as a POST request
        const {email, password, firstName, lastName, username} = req.body;

        // Basic validation
        if (!email || !password || !firstName || !username) {
            return res.status(400).json({error: "Please provide all required fields"});
        }

        // Step 2 : Does a user with this email already exist? If yes, we throw an error.
        const user = await User.findOne({email: email});
        if (user) {
            return res.status(403).json({error: "A user with this email already exists"});
        }

        // Step 3: Create a new user in the DB
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserData = {
            email,
            password: hashedPassword,
            firstName,
            lastName: lastName || "",
            username,
            likedSongs: [],
            likedPlaylists: [],
            subscribedArtists: []
        };

        const newUser = await User.create(newUserData);
        
        // Step 4: Create token
        const token = await getToken(email, newUser);

        // Step 5: Return the result to the user
        const userToReturn = {...newUser.toJSON(), token};
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({error: "Registration failed", details: error.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        // Step 1: Get email and password sent by user from req.body
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "Please provide email and password"});
        }

        // Step 2: Check if a user with the given email exists
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(403).json({error: "Invalid credentials"});
        }

        // Step 3: Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({error: "Invalid credentials"});
        }

        // Initialize arrays if they don't exist
        if (!user.likedSongs) user.likedSongs = [];
        if (!user.likedPlaylists) user.likedPlaylists = [];
        if (!user.subscribedArtists) user.subscribedArtists = [];
        await user.save();

        // Step 4: Generate token and return user data
        const token = await getToken(user.email, user);
        const userToReturn = {...user.toJSON(), token};
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({error: "Login failed", details: error.message});
    }
});

module.exports = router;