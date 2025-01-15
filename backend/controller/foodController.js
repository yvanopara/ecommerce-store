import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

// Ensure the 'uploads' directory exists
const uploadDirectory = path.join('/uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: 'Food added successfully' });
        console.log('Added');
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error: Food not added' });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
    }
};

// Remove food item and image
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        const filePath = path.join(uploadDirectory, food.image);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log('Error removing file:', err);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food deleted' });
    } catch (error) {
        console.log('Not deleted', error);
        res.json({ success: false, message: 'Food not deleted' });
    }
};

export { addFood, listFood, removeFood };
