import  userModel  from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";

//login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:'user not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:'invalid credentials'})
        }
        const token = createToken(user._id);
        res.json({success:true,message:'login success',token})
    } catch(error){
        console.log(error)
        res.json({success:false,message:'error'})

    }
}
    
    
    //jwt token
    const JWT_SECRET = "random#Secret"; 
    const createToken = (id) => {
        return jwt.sign({id},JWT_SECRET)
    }

    //register user
    const registerUser = async (req,res) => {
        const {name,email,password} = req.body;
        console.log(req.body)
        try{
            // checking if the user already exist
            const exist = await userModel.findOne({email});
            if(exist){
                return res.json({success:false,message:'user already exist'})
            }

            //Validation email and password
            if(!validator.isEmail(email)){
                return res.json({success:false,message:'Enter a valide email'})
            }
            if(password.length < 8){
                return res.json({success:false,message:'password is not strong'})
                console.log('enter ')
            }
            //hashing password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            const newUser = new userModel({
                name:name,
                email:email,
                password:hashedPassword,
               
            })
            const user =await newUser.save();
            const token = createToken(user._id);
            res.json({success:true,message:'user registered',token:token})

        } catch(error){
            console.log(error)
            res.json({success:false,message:'error user not registered'})
        }
    }
        

            export {loginUser,registerUser};