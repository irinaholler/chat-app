import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./utils/db.js";
import { app, server } from "./socket/socket.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


dotenv.config();

//const app = express();

//const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables.

const PORT = process.env.PORT || 5001;

// Allow requests from frontend
app.use(cors({
    origin: "http://localhost:3000",  // This allows requests from the React app
    credentials: true
}));

//Middleware
app.use(express.json()); // Allow to extract the Schema
app.use(cookieParser());
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
// Serve static files from the build folder
//this will make the server to know where yout frontend is located !
app.use(express.static(`${__dirname}/public/dist`))

// to build the Route
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//app.use(express.static(path.join(__dirname, "/frontend/dist")));

//app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
//});

app.get("*", (req, res) => {

    res.sendFile(`${__dirname}/public/dist/index.html`)
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on PORT ${PORT}`)
});