const { Item } = require("../models/itemModel");
const { User } = require("../models/userModel");
const { messageHandler } = require("../utils/messageHandler");

const createItem = async (req, res) => {
  try {
    const allowedUserId = "67778c99a635cffbf3553306";
    const userId = req.userId;
    if (userId !== allowedUserId) {
      messageHandler(res, 404, "You are not allowed to create items.");
    }
    const { itemTitle, itemCost, description, category } = req.body;
    if ((!itemTitle, !itemCost, !description, !category)) {
      return messageHandler(res, 400, "All details of items requireed");
    }
    const newItem = await Item({
      //getting Item from itemModel cause its its schema
      itemTitle,
      itemCreator: userId,
      itemCost,
      description,
      category,
    });
    await newItem.save(); //new because this is instnce of already made Item
    if (newItem) {
      return messageHandler(res, 200, "Item created successfuly", newItem);
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server Error");
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    if (items) {
      messageHandler(res, 200, "All items that have been created.", items);
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server error");
  }
};


module.exports = { createItem, getAllItems };
