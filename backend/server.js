import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// Load environment variables from .env file
dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env or default to 5432

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors());

// Start server and connect to the database

connectDB(); // Connect to the database

//api end point 
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))

app.listen(port, '0.0.0.0',() => {
console.log(`Server started on http://localhost:${port}`);
 });


// Routes
app.get('/', (req, res) => {
    res.send('API IS WORKING');
});