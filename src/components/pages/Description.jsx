import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextJ } from "../../context/Store";
import "./description.css";

const Description = () => {
  const { item } = useContext(ContextJ);
  const { id } = useParams();

  // Find the selected item based on the ID
  const selectedItem = item.find((element) => element._id === id);

  if (!selectedItem) {
    return <p>Item not found!</p>;
  }

  return (
    <div className="item-detail-container">
      <img
        src={selectedItem.picUrls}
        alt={selectedItem.itemTitle}
        className="item-detail-image"
      />
      <div className="item-detail-info">
        <h1>{selectedItem.itemTitle}</h1>
        <p>Price: ₹ {selectedItem.itemCost}</p>
        <p style={{ color: "green" }}>Discount: {selectedItem.discount} %</p>
        <p>Description: <span>{selectedItem.description}</span></p>
        <p>Category: #{selectedItem.category}</p>
        <button
          onClick={() =>
            (window.location.href = `/order/payment/${selectedItem._id}`)
          }
          className="userdescbuy-now-btn"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Description;
