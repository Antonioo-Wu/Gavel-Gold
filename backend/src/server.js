import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import subastaRoutes from "./routes/subastaRoutes.js";
import pujaRoutes from "./routes/pujaRoutes.js";
import cors from "cors";


dotenv.config();
connectDB()
const app = express();

app.use(cors());
app.use(express.json());



app.use(authRoutes);
app.use(usuarioRoutes);
app.use(subastaRoutes);
app.use(pujaRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server en PORT:", PORT)
})