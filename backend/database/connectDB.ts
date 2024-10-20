import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database connected");

    } catch (error: any) {
        console.log(error);
    }
}

export default connectDB;