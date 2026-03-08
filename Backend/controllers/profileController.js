import Profile from "../models/profile.js";

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id }); // _id
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        console.error("Profile error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Create profile
export const createUserProfile = async (req, res) => {
    try {
        // Check if profile already exists
        const existing = await Profile.findOne({ user: req.user._id });
        if (existing) {
            const updated = await Profile.findOneAndUpdate(
                { user: req.user._id },
                req.body,
                { new: true, runValidators: true }
            );
            return res.json(updated);
        }

        const profile = new Profile({
            user: req.user._id, 
            ...req.body
        });
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        console.error("Profile error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update profile
export const updateUserProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.user._id }, 
            req.body,
            { new: true, runValidators: true }
        );
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        console.error("Profile error:", error.message);
        res.status(500).json({ message: error.message });
    }
};