import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const logedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: logedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error while loading all the users");
    res.status(500).json({ error: "Internal server error" });
  }
};
