import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) =>{

    const {token} = req.headers;
    if(!token) {
        return res.json({success:false,message:'token not found login again'})
    }
    try{
        const token_decode = jwt.verify(token,'random#Secret')
        req.body.userId = token_decode.id
        next()
    }catch (error) {
        console.log(error);
        res.json({success:false,message:'Error bb'})
    }
}
export default authMiddleware;