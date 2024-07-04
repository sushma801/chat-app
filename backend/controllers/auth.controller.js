import User from "../models/user.model.js";
import bcyrcpt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ erroe: "Password is wrong" });

    const user = await User.findOne({ userName });
    if (user) return res.status(400).json({ error: "User is already exists" });
    // Hasing the password

    const salt = await bcyrcpt.genSalt(10);
    const hashPassword = await bcyrcpt.hash(password, salt);
    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // generate JWT
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user" });
    }
  } catch (e) {
    console.log("Error in sign up the user");
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcyrcpt.compare(
      password,
      user.password || ""
    );
    if (!user || !isPasswordCorrect) {
      console.log("in if block");
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (e) {
    console.log("Error while login the user");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout the user successfully" });
  } catch (e) {
    console.log("Error while logout the user");
    res.statu(500).json({ error: `Internal server error` });
  }
};
