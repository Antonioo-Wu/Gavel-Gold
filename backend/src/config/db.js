import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error conectando a mongoDB", error);
        process.exit(1); 
    }
}