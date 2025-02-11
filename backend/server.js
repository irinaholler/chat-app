import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./utils/db.js"

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();

//Middleware
app.use(express.json()); // Allow to extract the Schema
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("Incoming request body:", req.body);
    next();
});

// to build the Route
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    // root route http://localhost:5001/
    res.send("Hello World!");
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on PORT ${PORT}`)
});