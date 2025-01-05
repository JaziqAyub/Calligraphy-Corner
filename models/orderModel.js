const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item"},
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderCost: { type: Number, require: true },
  paymentMode: { type: String, enum: ["cod", "card", "online"] },
  payment : {type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  orderStatus: { type: String, enum: ["completed", "pending" , "cancelled" , "refunded" , "inTransit"] , default : "pending" },

  shippingAddress: { type: String, required: true }, 
  landmark: { type: String, required: true }, 
  city: { type: String, required: true}, 
  postalCode: { type: Number, required: true},
  
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});


const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };