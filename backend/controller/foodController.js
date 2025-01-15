import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

// Chemin de stockage des fichiers
const UPLOAD_DIR = "/uploads";

// Crée le répertoire si nécessaire
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Ajouter un aliment
const addFood = async (req, res) => {
  try {
    const image_filename = req.file.filename;

    // Déplacer le fichier uploadé dans le répertoire persistant
    const tempPath = req.file.path; // Chemin temporaire
    const finalPath = path.join(UPLOAD_DIR, image_filename);

    fs.renameSync(tempPath, finalPath); // Déplace le fichier

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename, // Enregistre seulement le nom
    });

    await food.save();
    res.json({ success: true, message: "Food added successfully" });
    console.log("Food added");
  } catch (error) {
    console.error("Error adding food:", error);
    res.json({ success: false, message: "Error: food not added" });
  }
};

// Liste des aliments
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing foods:", error);
    res.json({ success: false, message: "Error retrieving food list" });
  }
};

// Supprimer un aliment
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // Supprimer l'image du disque
    const filePath = path.join(UPLOAD_DIR, food.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food deleted" });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.json({ success: false, message: "Food not deleted" });
  }
};

export { addFood, listFood, removeFood };