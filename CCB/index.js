const express = require("express"); //import express from node modules
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
const app = express(); //instance of express
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
require("dotenv").config(); //.ENV

//middleware
app.use(express.json()); //to read json in thunderclient etc
app.use(
  cors({
    origin: "http://localhost:3000", //koi bhi port accept
    credentials: true, //acceptcookies
  })
); //fo safety in b/w ports from front end to back end and vice versa
app.use(cookieParser()); //for saving userId, otken or etc in cookies

//To connect with the Db
connectDb();

// Apis (routes) User routes
app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});
//userRoutes
app.post("/user/register", registerHandler); //done
app.post("/user/login", loginHandler); //done
app.post("/user/forgotPass", forgotPassHandler); //done
app.put("/user/password/reset/:userId", resetPassHandler); //done
app.get("/user/isAuth/:token", isAuthorised);
//secureRouteOfUser
app.post("/user/delete", isAuthenticated, deleteUserHandler); //done
app.get("/getUser", isAuthenticated, getUser); //done
app.post("/user/changePassword", isAuthenticated, changePasshandler);

//itemRoutes
app.post("/admin/createItem", isAuthenticated, createItem); //done
app.get("/items/all", isAuthenticated, getAllItems);
app.get("/items/item", isAuthenticated, getItemById);
app.put("/item/edit", isAuthenticated, editItemById);
app.delete("/item/delete/:itemId", isAuthenticated, deleteItemById); //done
//cloudinary
app.post("/admin/upload/Itempicture", multmid, isAuthenticated, uploadItemPic); //done

//orderRoutes
app.post("/customer/create/order", isAuthenticated, createOrder);
app.get("/customer/fetch/order", isAuthenticated, getOrderById);
app.put("/customer/cancel/order", isAuthenticated, cancelOrder);
app.get("/customer/fetchAll/orders", isAuthenticated, getAllOrders);

//paymentRoute
app.post("/customer/pay/order", isAuthenticated, createPaymentIntent);

//cart
app.post("/add-to-cart", isAuthenticated, addToCart);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
