const { Cart } = require("../models/cartModel");
const { Item } = require("../models/itemModel");
const { User } = require("../models/userModel");
const { messageHandler } = require("../utils/messageHandler");

const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // Get user ID from request
    const { itemId, quantity } = req.body;

    if (!itemId) {
      return messageHandler(res, 400, "Item ID is required.");
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return messageHandler(res, 404, "Item not found.");
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ user: userId, items: [] });
      await cart.save();

      
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.item.toString() === itemId
    );

    if (existingItemIndex > -1) {
      // If item exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      // If item does not exist, add it
      cart.items.push({ item: itemId, quantity: quantity || 1 });
    }
    // Add the new cart to the user's cart field
    // const user = await User.findById(userId);
    // if (user) {
    //   user.cart.push(cart._id);
    //   await user.save();
    // }

    cart.updatedOn = Date.now();
    await cart.save();

    return messageHandler(res, 200, "Item added to cart successfully.", cart);
  } catch (error) {
    console.error(error);
    return messageHandler(res, 500, "Error adding item to cart");
  }
};

module.exports = { addToCart };
