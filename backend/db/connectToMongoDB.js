import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected with mongodb ");
  } catch (error) {
    console.log("Error while connecting the mongodb", error.message);
  }
};

export default connectToMongoDB;
