import twilio from 'twilio'; // Import Twilio library
import dotenv from "dotenv";

dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const sendTwilioMessage = async (req, res) => {  // Renamed the function
    const { message } = req.body;  // Extract message from the body

    // Twilio client initialization

    // Send the message via Twilio
    client.messages
        .create({
            body: message,  // Message to send
            from: 'whatsapp:+14155238886',  // Replace with your Twilio number
            to: 'whatsapp:+23793800251'     // Replace with recipient's number
        })
        .then(() => {
            console.log('Notification sent successfully!');
            res.status(200).send('Notification sent.');
        })
        .catch((err) => {
            console.error('Error sending notification:', err);
            res.status(500).send('Error sending notification.');
        });
};

export { sendTwilioMessage };
