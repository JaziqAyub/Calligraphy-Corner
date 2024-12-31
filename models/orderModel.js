const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item"},
  orderCost: { type: Number, require: true },
  paymentMode: { type: String, enum: ["cod", "card", "online"] },
  payment : {type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  orderStatus: { type: String, enum: ["completed", "pending" , "cancelled" , "refunded" , "inTransit"] , default : "pending" },

  shippingAddress: { fullName: { type: String, required: true }, addressLine1: { type: String, required: true }, city: { type: String, required: true}, postalCode: { type: Number, required: true}, },
  
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});


const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };