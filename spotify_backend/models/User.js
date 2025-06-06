const mongoose = require("mongoose");
// How to create a model
// Step 1 :require mongoose
// Step 2 :Create a mongoose schema (structure of a user)
// Step 3 : Create a model

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    lastName: {
        type: String,
        required: false,
        default: "",
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    likedSongs: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Song"
        }],
        default: [],
        required: true,
        get: function(val) {
            return Array.isArray(val) ? val : [];
        },
        set: function(val) {
            return Array.isArray(val) ? val : [];
        }
    },
    likedPlaylists: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Playlist"
        }],
        default: [],
        required: true,
        get: function(val) {
            return Array.isArray(val) ? val : [];
        },
        set: function(val) {
            return Array.isArray(val) ? val : [];
        }
    },
    subscribedArtists: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }],
        default: [],
        required: true,
        get: function(val) {
            return Array.isArray(val) ? val : [];
        },
        set: function(val) {
            return Array.isArray(val) ? val : [];
        }
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
});

// Pre-save middleware to ensure arrays are initialized
UserSchema.pre('save', function(next) {
    this.likedSongs = Array.isArray(this.likedSongs) ? this.likedSongs : [];
    this.likedPlaylists = Array.isArray(this.likedPlaylists) ? this.likedPlaylists : [];
    this.subscribedArtists = Array.isArray(this.subscribedArtists) ? this.subscribedArtists : [];
    next();
});

// Static method to update arrays without full validation
UserSchema.statics.updateArrays = async function(userId, updates) {
    // First, get the current user
    const user = await this.findById(userId);
    if (!user) return null;

    // Ensure arrays exist
    if (!Array.isArray(user.likedSongs)) user.likedSongs = [];
    if (!Array.isArray(user.likedPlaylists)) user.likedPlaylists = [];
    if (!Array.isArray(user.subscribedArtists)) user.subscribedArtists = [];

    // Apply updates
    if (updates.$push && updates.$push.likedSongs) {
        user.likedSongs.push(updates.$push.likedSongs);
    }
    if (updates.$pull && updates.$pull.likedSongs) {
        user.likedSongs = user.likedSongs.filter(id => 
            id.toString() !== updates.$pull.likedSongs.toString()
        );
    }

    // Save with validation disabled
    return user.save({ validateBeforeSave: false });
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;