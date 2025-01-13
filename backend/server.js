import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoot.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bodyParser from 'body-parser';

import twilioRouter from "./routes/twilioRoute.js";


// import orderRouter from "./routes/orderRoute.js";

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
app.use("/images",express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/twilio',twilioRouter)






// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to receive notifications
app.post('/notify', (req, res) => {
    const { message } = req.body;  // Extract message from the body

    // Send the message via Twilio
    client.messages
        .create({
            body: message,  // Message to send
            from: 'whatsapp:+14155238886',  // Remplacez par votre numéro Twilio
            to: 'whatsapp:+23793800251'     // Remplacez par le numéro du destinataire
        })
        .then(() => {
            console.log('Notification envoyée avec succès!');
            res.status(200).send('Notification envoyée.');
        })
        .catch((err) => {
            console.error('Erreur lors de l\'envoi de la notification:', err);
            res.status(500).send('Erreur lors de l\'envoi de la notification.');
        });
});






app.listen(port, '0.0.0.0',() => {
console.log(`Server started on http://localhost:${port}`);
 });


// Routes
app.get('/', (req, res) => {
    res.send('API IS WORKING');
});









// Account SID  AC32c217d92414d19ed0facb149f105262
// Auth Token 523dfc48499f6997ccf7b8053d3c220b
