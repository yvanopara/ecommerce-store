import express from 'express'
import { loginUser, registerUser,google } from '../controller/userController.js';

const userRouter = express.Router();
userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.post("/google", google)

export default userRouter;

