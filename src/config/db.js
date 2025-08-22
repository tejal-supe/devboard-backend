import mongoose from "mongoose";
import config from "./environment.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.database_url)
        console.log("DB Connected", conn.connection.host);
        
    } catch (error) {
        console.log("DB connection error,",error); 
    }
}