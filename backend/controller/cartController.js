import userModel from "../models/userModel.js";


//add to cart

const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = await userData.cartData
        if(!cartData[req.body.itemId]){

            cartData[req.body.itemId] = 1;
            
    }
    else{
        cartData[req.body.itemId] += 1;
            
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,  message:"Item added to cart"})
    console.log(cartData, userData);
    

} catch (error) {
        console.log(error);
        res.json({message:"Error adding item to cart"})
    }
}

//remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = await userData.cartData
        if(cartData[req.body.itemId] >= 1){

            cartData[req.body.itemId] -= 1;
            
    }
   
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.status(200).json({message:"Item remove from cart"})
    console.log(cartData);
    

} catch (error) {
        console.log(error);
        res.json({message:"Error removing item to cart"})
    }
}

//fetch Usercart Data
const getCart = async (req, res) => {
    try {
        // Fetch user data
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract cart data
        const cartData = userData.cartData;

        // Log and return the cart data
        console.log(cartData);
        res.status(200).json({ message: "Items are displayed", cartData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching cart data", error });
    }
};

export {addToCart,removeFromCart,getCart}