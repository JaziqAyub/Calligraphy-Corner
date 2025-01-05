const { Item } = require("../models/itemModel")
const { Order } = require("../models/orderModel")
const { User } = require("../models/userModel")
const { messageHandler } = require("../utils/messageHandler")

const createOrder = async(req, res)=>{
    try {
       const  {itemId} = req.query
       const item = await Item.findById(itemId)
       const userId = req.userId
       const user = await User.findById(userId)
        const {paymentMode, shippingAddress,landmark,city , postalCode } = req.body

       if (!item || item.isActive === false){
        messageHandler (res, 404, "Item unavailable.")
       }
       if (user.role=== "admin" || !user){
        return messageHandler(res, 404, "Cant place order because you are not a customer.")
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

       const updateUsersOrderArray = user.orders.push(order._id)
       await user.save()
       await order.save()
       return messageHandler(res, 200, "Order placed successfully", order)



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

const getOrderById = async(req,res)=>{
    try {
        const {orderId} = req.query
        const order =  await Order.findById(orderId)
        if (!order){
            return messageHandler(res, 404,"Order not found.")
        }
        if (order){
            return messageHandler(res, 200, order)
        }
    } catch (error) {
        console.log(error)
    }
}

const cancelOrder = async (req, res)=> {
    try {
        const {orderId} = req.query
        const order = await Order.findById(orderId)
        if (!order){
            return messageHandler(res, 404, "Order not found")
        }
       const updatedOrder = order.orderStatus = "cancelled"
       await order.save()
       messageHandler(res, 200, "Order cancelled" , updatedOrder)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createOrder, cancelOrder, getOrderById}