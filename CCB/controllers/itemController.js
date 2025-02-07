const { Item } = require("../models/itemModel");
const { User } = require("../models/userModel");
const { messageHandler } = require("../utils/messageHandler");

const createItem = async (req, res) => {
  try {
    const adminUserId = "677c2491b6d0c2f95fdb0211";
    const userId = req.userId;
    const user = await User.findById(userId)
    if (userId !== adminUserId) {
      return messageHandler(res, 404, "Only the admin can create items.");
    }
    const { itemTitle, itemCost, discount, description, category, role } =
      req.body;
    if (!itemTitle || !itemCost || !description ) {
      return messageHandler(res, 400, "All details of items requireed");
    }
    const newItem = await Item({
      //getting Item from itemModel cause its its schema
      itemTitle,
      itemCreator: user._id,
      itemCost,
      discount,
      description,
      category,
      role,
    });
    await newItem.save(); //new because this is instance of already made Item
    if (newItem) {
      user.items.push(newItem._id)
      await user.save()
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
      messageHandler(
        res,
        200,
        "All items that have been created are as under:-",
        items
      );
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server error");
  }
};

const getItemById = async (req, res) => {
  try {
    const { itemId } = req.query;
    const item = await Item.findById(itemId);
    if (!item) {
      return messageHandler(res, 404, "Item not found");
    }
    return messageHandler(res, 200, "Item found", item);
  } catch (error) {
    console.log(error);
    if (error.response && (error.response.status === 400 || 404 || 500)) {
      toast.error(error.response.data.message || "server Error");
    } else {
      toast.error("An unexpected error occurred!");
    }
  }
};

const editItemById = async (req, res) => {
  try {
    const { itemId } = req.query;
    const userId = req.userId;
    const user = await User.findById(userId);
    const item = await Item.findById(itemId);
    if (!item) {
      return messageHandler(res, 404, "Item not found");
    }
    if (!user) {
      return messageHandler(res, 404, "User not found");
    }
    if (item.itemCreator.toString() === !userId) {
      return messageHandler(
        res,
        403,
        "You cannot edit the service, unaothorised to edit."
      );
    }
    const { itemTitle, itemCost, description, category, discount } = req.body;

    if (!itemTitle || !itemCost || !discount || !description || !category) {
      return messageHandler(res, 400, "All details of items requireed");
    }

    item.itemTitle = itemTitle;
    item.itemCost = itemCost;
    item.discount = discount;
    item.description = description;
    item.category = category;
    const updateService = await item.save();
    if (updateService) {
      return messageHandler(res, 200, "Updated Successfuly");
    }
    // another method which is fast
    // const editItem = await Item.findByIdAndUpdate(item, {
    //   itemTitle, itemCost, description, category
    // })
    // const updateService = await Item.findByIdAndUpdate(itemId)
    // if (editItem){
    //   return messageHandler(res, 200, "Updated Successfuly");

    // }
  } catch (error) {
    console.log(error);
  }
};

const deleteItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return messageHandler(res, 404, "Item not found");
    }
    return messageHandler(res, 200, "Item Deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  editItemById,
  deleteItemById,
};
