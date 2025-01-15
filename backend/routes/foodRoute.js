import express from 'express';
import { addFood, listFood, removeFood } from '../controller/foodController.js';
import multer from 'multer';
import path from 'path';

// Image storage engine configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('/uploads')); // Store in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const foodRouter = express.Router();

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;
