const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

// Middleware to ensure JSON responses
router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Error handler middleware
const handleErrors = (err, res) => {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
};

// Create a new song
router.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const {name, thumbnail, track} = req.body;
            if (!name || !thumbnail || !track) {
                return res.status(400).json({error: "Insufficient details to create song."});
            }
            const artist = req.user._id;
            const songDetails = {name, thumbnail, track, artist};
            const createdSong = await Song.create(songDetails);
            return res.json(createdSong);
        } catch (err) {
            return handleErrors(err, res);
        }
    }
);

// Get all songs by current user
router.get(
    "/get/mysongs",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const songs = await Song.find({artist: req.user._id}).populate("artist");
            return res.json({data: songs});
        } catch (err) {
            return handleErrors(err, res);
        }
    }
);

// Get all songs by name (search)
router.get(
    "/get/songname/:name",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const songs = await Song.find({
                name: { $regex: req.params.name, $options: "i" }
            }).populate("artist");
            return res.json({data: songs});
        } catch (err) {
            return handleErrors(err, res);
        }
    }
);

// Get all liked songs
router.get(
    "/liked",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            console.log("Fetching liked songs for user:", req.user._id);
            const user = await User.findById(req.user._id)
                .populate({
                    path: "likedSongs",
                    populate: {
                        path: "artist",
                        select: "firstName lastName username"
                    }
                });

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            console.log("Found liked songs:", user.likedSongs);
            return res.json({data: user.likedSongs || []});
        } catch (err) {
            return handleErrors(err, res);
        }
    }
);

// Check if a song is liked
router.get(
    "/is-liked/:songId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const {songId} = req.params;
            const user = await User.findById(req.user._id);
            
            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const isLiked = user.likedSongs ? user.likedSongs.some(id => id.toString() === songId) : false;
            return res.json({isLiked});
        } catch (err) {
            return handleErrors(err, res);
        }
    }
);

// Like a song
router.post(
    "/like",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const {songId} = req.body;
            if (!songId) {
                return res.status(400).json({error: "Song ID is required"});
            }

            // Check if song exists
            const song = await Song.findById(songId);
            if (!song) {
                return res.status(404).json({error: "Song not found"});
            }

            // Add song to user's liked songs if not already liked
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const likedSongs = user.likedSongs || [];
            const alreadyLiked = likedSongs.some(id => id.toString() === songId);
            
            if (!alreadyLiked) {
                const updatedUser = await User.updateArrays(user._id, {
                    $push: { likedSongs: songId }
                });
                
                if (!updatedUser) {
                    return res.status(500).json({error: "Failed to update liked songs"});
                }
            }

            return res.json({success: true, message: "Song liked successfully"});
        } catch (err) {
            return handleErrors(err, res);
        }
    }
);

// Unlike a song
router.post(
    "/unlike",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try {
            const {songId} = req.body;
            if (!songId) {
                return res.status(400).json({error: "Song ID is required"});
            }

            // Remove song from user's liked songs
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const updatedUser = await User.updateArrays(user._id, {
                $pull: { likedSongs: songId }
            });

            if (!updatedUser) {
                return res.status(500).json({error: "Failed to update liked songs"});
            }

            return res.json({success: true, message: "Song unliked successfully"});
        } catch (err) {
            return handleErrors(err, res);
        }
    }
);

module.exports = router;