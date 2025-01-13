import express from 'express'
import { sendTwilioMessage} from '../controller/twilio.js';





const twilioRouter = express.Router();

twilioRouter.post('/notify',sendTwilioMessage)

export default twilioRouter;
