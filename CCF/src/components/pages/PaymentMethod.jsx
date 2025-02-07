import React, { useContext } from "react";
import { ContextJ } from "../../context/Store";
import { useNavigate, useParams } from "react-router-dom";

const PaymentMethod = () => {
      const { orderId } = useParams();
    
  const { cancelOrder } = useContext(ContextJ);
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" , marginTop : "250px"}}>
      PaymentMethod
      <div>
        <button
          onClick={() => {
            cancelOrder(orderId);
            navigate("/usershop");
          }}
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
