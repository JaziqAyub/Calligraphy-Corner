// const mongoose = require("mongoose")

// const User = mongoose.model("User",{
//     username: String,
//     email: String,
//     password: String,
//     role: String,
// })

// module.exports = { User }

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["admin", "customer"],
    // default: "customer",
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  //   Items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
