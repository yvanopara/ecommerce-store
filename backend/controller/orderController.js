import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const frontedUrl = "http://localhost:3000"; // This could be a payment session or confirmation page

// Placing user order for front-end
const placeOrder = async (req, res) => {
   try {
      // Create a new order
      const newOrder = new orderModel({
         userId: req.body.userId,
         items: req.body.items,
         amount: req.body.amount,
         address: req.body.address,
      });
      await newOrder.save();

      // Clear the user's cart
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

      // Example: Redirect URL after successful order (this could be a payment session URL or confirmation page)
      const session_url = `${frontedUrl}/verify?orderId=${newOrder._id}`;

      // Respond with the session URL for redirection
      res.json({ success: true, session_url });
   } catch (error) {
      res.json({ success: false, message: "Errorrrr" });
      console.log(error);
   }
};
//user orders for frontend
 const userOrders = async (req, res) => {
   try {
      const orders = await orderModel.find({ userId:req.body.userId });
      res.json({ success: true, data:orders });

   } catch (error) {
      res.json({ success: false, message: "Errorrrr" });
      console.log(error);
   }
 }

// listing all orders
 const listOrders = async (req, res) => {
   try{
      const orders = await orderModel.find({})
      res.json({success:true, data:orders})
      } catch(error){
         console.log(error);
         res.json({success:false, message:"Errorrrr"})

   }
 }
 const updateStatus = async (req, res) => {
   try{

      await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
      res.json({success:true, message:"Status Updated"})

   } catch(error){
      res.json({success:false, message:"Error in updating"})
   }
 }
export { placeOrder, userOrders, listOrders,updateStatus  };
