import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
// import "./Shop.css";
import EditForm from "../atoms/EditForm";
import { Link, useNavigate } from "react-router-dom";
import "./UserShop.css";


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
        <div className="useritems">
          {Array.isArray(item) && item.length > 0 ? (
            item.map((element, index) => (
              <div className="useritem" key={element.id || index}>
                <div className="useritem-image-wrapper">
                <Link to={`/item/description/${element._id}`}>
                  <img
                    src={element.picUrls}
                    alt={element.itemTitle}user
                    className="useritem-image"
                  />
                  </Link>
                </div>
                <div className="useritem-header">
                  <h3 className="useritem-title">{element.itemTitle}</h3>
                  <div className="useritem-actions">
                    {/* Edit and Delete icons can be added here if needed */}
                  </div>
                </div>
                <div className="useritem-details">
                  <p className="useritem-cost">₹ {element.itemCost}</p>

                  {/* <p className="item-description">{element.description}</p> */}
                  {/* <p className="item-discount">
                    Discount: {element.discount} %
                  </p> */}
                  {/* <p className="item-category">#{element.category}</p> */}
                </div>
                <button
                  onClick={() => navigate(`/order/payment/${element._id}`)}
                  className="userbuy-now-btn"
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
