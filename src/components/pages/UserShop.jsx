import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import "./Shop.css";
import EditForm from "../atoms/EditForm";
import { useNavigate } from "react-router-dom";

const UserShop = () => {
  const { item } = useContext(ContextJ);
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();

  console.log(item); // Debugging

  return (
    <>
      <div className="heroShop">
        <p>Shop Your Favorite Calligraphy Items here</p>
      </div>
      {editForm ? (
        <EditForm setEditForm={setEditForm} />
      ) : (
        <div className="items">
          {Array.isArray(item) && item.length > 0 ? (
            item.map((element, index) => (
              <div className="item" key={element.id || index}>
                <div className="item-image-wrapper">
                  <img
                    src={element.picUrls}
                    alt={element.itemTitle}
                    className="item-image"
                  />
                </div>
                <div className="item-header">
                  <h3 className="item-title">{element.itemTitle}</h3>
                  <div className="item-actions">
                    {/* Edit and Delete icons can be added here if needed */}
                  </div>
                </div>
                <div className="item-details">
                  <p className="item-cost">₹ {element.itemCost}</p>

                  <p className="item-description">{element.description}</p>
                  <p className="item-discount">
                    Discount: {element.discount} %
                  </p>
                  <p className="item-category">#{element.category}</p>
                </div>
                <button
                  onClick={() => navigate(`/order/payment/${element._id}`)}
                  className="buy-now-btn"
                >
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserShop;
