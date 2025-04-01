const express = require("express");
const {
  registerHandler,
  loginHandler,
  forgotPassHandler,
  resetPassHandler,
  deleteUserHandler,
  getUser,
  changePasshandler,
  uploadProfilePic,
  uploadPic,
  uploadItemPic,
} = require("./controllers/userController");
const connectDb = require("./config/connectDb");
const cors = require("cors");
const { isAuthorised } = require("./auth/isAuthorised");
const { isAuthenticated } = require("./auth/isAuthenticated");
const cookieParser = require("cookie-parser");
const {
  createItem,
  getAllItems,
  getItemById,
  editItemById,
  deleteServiceById,
  deleteItemById,
} = require("./controllers/itemController");
const {
  createOrder,
  cancelOrder,
  getAllOrders,
  getAllOrderById,
  getOrderById,
} = require("./controllers/orderController");
const { createPaymentIntent } = require("./controllers/paymentController");
const { multmid } = require("./middlewares/multer");
const { addToCart } = require("./controllers/cartController");
require("dotenv").config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration: allow requests from your Vercel frontend
const allowedOrigin = "https://calligraphy-corner.vercel.app";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(cookieParser());

// Connect to the Database
connectDb();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

// User Routes
app.post("/user/register", registerHandler);
app.post("/user/login", loginHandler);
app.post("/user/forgotPass", forgotPassHandler);
app.put("/user/password/reset/:userId", resetPassHandler);
app.get("/user/isAuth/:token", isAuthorised);
app.post("/user/delete", isAuthenticated, deleteUserHandler);
app.get("/getUser", isAuthenticated, getUser);
app.post("/user/changePassword", isAuthenticated, changePasshandler);

// Item Routes
app.post("/admin/createItem", isAuthenticated, createItem);
app.get("/items/all", isAuthenticated, getAllItems);
app.get("/items/item", isAuthenticated, getItemById);
app.put("/item/edit", isAuthenticated, editItemById);
app.delete("/item/delete/:itemId", isAuthenticated, deleteItemById);
app.post("/admin/upload/Itempicture", multmid, isAuthenticated, uploadItemPic);

// Order Routes
app.post("/customer/create/order", isAuthenticated, createOrder);
app.get("/customer/fetch/order", isAuthenticated, getOrderById);
app.put("/customer/cancel/order", isAuthenticated, cancelOrder);
app.get("/customer/fetchAll/orders", isAuthenticated, getAllOrders);

// Payment Route
app.post("/customer/pay/order", isAuthenticated, createPaymentIntent);

// Cart Route
app.post("/add-to-cart", isAuthenticated, addToCart);

// Listen on PORT from environment variable or default to 4011
const PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
