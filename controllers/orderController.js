const { Item } = require("../models/itemModel")
const { Order } = require("../models/orderModel")
const { User } = require("../models/userModel")
const { messageHandler } = require("../utils/messageHandler")

const createOrder = async(req, res)=>{
    try {
       const  {itemId} = req.query
       const item = await Item.findById(itemId)
       const userId = req.userId
        const {paymentMode, shippingAddress,landmark,city , postalCode } = req.body

       if (!item || item.isActive === "false"){
        messageHandler (res, 404, "Item unavailable.")
       }

       const orderCost = item.itemCost - (item.itemCost * (item.discount / 100));
    //    console.log(orderCost)

       const order = await Order.create({
        item: itemId,
        orderCost: orderCost,
        paymentMode: paymentMode,
        customer: userId,
        shippingAddress,
        landmark,
        city, 
        postalCode
       })

       await order.save()
       return messageHandler(res, 200, "Order placed successfully", order)



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {createOrder}