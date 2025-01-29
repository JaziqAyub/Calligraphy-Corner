import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { ContextJ } from "../../context/Store";
import "./orderPayment.css";
import { toast } from "react-toastify";

const OrderPayment = () => {
  const { id } = useParams(); // Get item ID from URL
  const { item, createOrder } = useContext(ContextJ);

  const [formData, setFormData] = useState({
    paymentMode: "",
    shippingAddress: "",
    landmark: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleOrder = async () => {
    const selectedItem = item.find((i) => i._id === id); // Find the correct item
    if (selectedItem) {
      await createOrder(selectedItem._id, formData);
      toast.success("Order created successfully!");
    } else {
      toast.error("Item not found.");
    }
  };

  return (
    <div className="order-payment-container">
      <h2>Address Details</h2>
      <div className="item-order">
        <form>
          <input
            type="text"
            placeholder="Payment Mode"
            name="paymentMode"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Shipping Address"
            name="shippingAddress"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Landmark"
            name="landmark"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Postal Code"
            name="postalCode"
            onChange={handleChange}
          />
        </form>

        <button onClick={handleOrder} className="buy-now-btn">
          Proceed for payment
        </button>
      </div>
    </div>
  );
};

export default OrderPayment;
