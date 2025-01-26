
import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import "./orderPayment.css";
import { toast } from "react-toastify";

const OrderPayment = () => {
  // const { orderId } = useParams();
  const { user, createOrder } = useContext(ContextJ);


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

  return (
    <div className="order-payment-container">
      <h2>Adress Details</h2>
      {user.items &&
        user.items.map((element, index) => (
          <div className="item-order" key={element.id || index}>
            <div>
              {/* <h3 className="item-title">{element.itemTitle}</h3> */}
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

              <button
                onClick={async () => {
                  await createOrder(element._id, formData);
                  toast.success("Adress updated successfully!");
                  // navigate(`/payment`, {
                  //   state: { orderId: element._id, formData },
                  // });
                }}
                className="buy-now-btn"
              >
                Proceed
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderPayment;
