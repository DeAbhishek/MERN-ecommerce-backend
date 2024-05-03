const Order = require("../model/Order");

exports.fetchOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.query.userID });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder=async(req,res)=>{
  try{
    const order=await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({message:"Order not found"});
    }
    await order.remove();
    res.status(200).json({message:"Order deleted successfully"});
  }catch(error){
    res.status(500).json({message:error.message});
  }
}

exports.updateOrder=async(req,res)=>{
  try{
    const order=await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({message:"Order not found"});
    }
    order.status=req.body.status;
    await order.save();
    res.status(200).json(order);
  }catch(error){
    res.status(500).json({message:error.message});
  }
}
