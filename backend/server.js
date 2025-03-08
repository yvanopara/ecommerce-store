import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoot.js";
import orderRouter from "./routes/orderRoute.js";
import twilioRouter from "./routes/twilioRoute.js";
import cartRouter from "./routes/cartRoute.js";

// Load environment variables from .env file
dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors());


// Connect to the database pour testé mon serveurr
connectDB();

// API endpoints
app.use('/api/food', foodRouter);
app.use("/images", express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/twilio', twilioRouter);

// Default route
app.get('/', (req, res) => {
    res.send('API IS WORKING');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on http://localhost:${port}`);
});
