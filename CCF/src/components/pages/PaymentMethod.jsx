import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import { useNavigate, useParams } from "react-router-dom";
import "./PaymentMethod.css"; // Import CSS file
import { FaCreditCard, FaGooglePay, FaUniversity, FaWallet } from "react-icons/fa";

const PaymentMethod = () => {
  const { orderId } = useParams();
  const { cancelOrder } = useContext(ContextJ);
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("card");
  
  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2 className="payment-title">Complete Your Payment</h2>
        
        {/* Payment Mode Selection */}
        <div className="payment-modes">
          <button className={paymentMode === "card" ? "active" : ""} onClick={() => setPaymentMode("card")}>
            <FaCreditCard /> Credit/Debit Card
          </button>
          <button className={paymentMode === "upi" ? "active" : ""} onClick={() => setPaymentMode("upi")}>
            <FaGooglePay /> UPI
          </button>
          <button className={paymentMode === "netbanking" ? "active" : ""} onClick={() => setPaymentMode("netbanking")}>
            <FaUniversity /> Net Banking
          </button>
          <button className={paymentMode === "wallet" ? "active" : ""} onClick={() => setPaymentMode("wallet")}>
            <FaWallet /> Wallets
          </button>
        </div>
        
        {/* Payment Form */}
        <div className="payment-form">
          {paymentMode === "card" && (
            <div>
              <input type="text" placeholder="Card Number" className="input-field" />
              <input type="text" placeholder="Card Holder Name" className="input-field" />
              <div className="card-details">
                <input type="text" placeholder="MM/YY" className="input-field small" />
                <input type="text" placeholder="CVV" className="input-field small" />
              </div>
            </div>
          )}
          {paymentMode === "upi" && <input type="text" placeholder="Enter UPI ID" className="input-field" />}
          {paymentMode === "netbanking" && <select className="input-field">
            <option>Select Bank</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>State Bank of India</option>
          </select>}
          {paymentMode === "wallet" && <input type="text" placeholder="Enter Wallet Number" className="input-field" />}
        </div>

        {/* Payment Actions */}
        <div className="payment-buttons">
          <button className="pay-now">Pay Now</button>
          <button className="cancel-order" onClick={() => {
            cancelOrder(orderId);
            navigate("/usershop");
          }}>Cancel Order</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;