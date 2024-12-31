const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  paymentAmount: { type: Number, require: true },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "PayPal", "UPI"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["completed", "pending", "refunded"],
    default: "pending",
  },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paymentOn: { type: Date, default: Date.now() },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
