import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password here (you can add this logic)

        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyAvatar : girlAvatar,
        });

        if (newUser){
            // generate JWT token here
             generateTokenAndCookie(newUser._id , res);

            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,

        
        
        });

    }
       else {
        res.status(400).json({error: "invalid user data"});
       }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Assuming you have a function called `generateTokenAndCookie`
        generateTokenAndCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
 
    export const logout = (req, res) =>{

        try {

            res.cookie ("jwt", "" ,{maxAge:0})
            res.status(200).json({message: "logged out successfully"})

            
        } catch (error) {
            
            console.log("Error in login controller:", error.message);
            res.status(500).json({ error: "Internal server error" });

        }
    };


        

