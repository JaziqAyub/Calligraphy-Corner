const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemTitle: {type : String},
  description : {type : String},
  category: {
    type: String,
    enum: ['Big Canvas', 'Small Canvas', 'Birthday Calendar'],
    required: true,
  },
  itemCost: { type: Number },
  picUrls :[{ type: String }],
  isActive: { type: Boolean , default :false},
  discount : {type :Number},
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = { Item };