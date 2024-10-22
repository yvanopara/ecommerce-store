import express from 'express'
import { addFood, listFood, removeFood } from '../controller/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();




//imwgr storage
const storage = multer.diskStorage({
    destination: 'uplooads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage: storage})
foodRouter.post('/add',upload.single('image'), addFood)

foodRouter.get('/list',listFood)

foodRouter.post('/remove', removeFood)

export default foodRouter;