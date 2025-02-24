import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        // Check if the request body is valid JSON
        if (!req.body || typeof req.body !== 'object') {
            console.log("Invalid JSON format");
            return res.status(400).json({ error: "Invalid JSON format" });
        }

        const { fullname, username, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        //HASH Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilLetters = `https://avatar.iran.liara.run/username?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            profilePic: profilLetters,
        });

        if (newUser) {
            //Generate JKW token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save(); // Save to the DB

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            console.log("Invalid user data.");
            res.status(400).json({ error: "Invalid user data." })
        }

    } catch (error) {
        console.log("Error in signup", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Loged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};