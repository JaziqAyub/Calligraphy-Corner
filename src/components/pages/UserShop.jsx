import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import "./Shop.css";
import EditForm from "../atoms/EditForm";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UserShop = () => {
  const { item, deleteItemById } = useContext(ContextJ);
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();

  console.log(item); // Debugging

  return (
    <>
      {editForm ? (
        <EditForm setEditForm={setEditForm} />
      ) : (
        <div className="items">
          {Array.isArray(item) && item.length > 0 ? (
            item.map((element, index) => (
              <div className="item" key={element.id || index}>
                <div className="item-header">
                  <h3 className="item-title">{element.itemTitle}</h3>
                  <div className="item-actions">
                    {/* <MdEdit
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => {
                        sessionStorage.setItem("itemId", element._id);
                        setEditForm(true);
                      }}
                    /> */}
                    {/* <MdDelete
                      style={{ color: "maroon", cursor: "pointer" }}
                      onClick={() => {
                        alert("Do you want to delete this item?");
                        deleteItemById(element._id);
                      }}
                    /> */}
                  </div>
                </div>
                <div className="item-image-wrapper">
                  <img
                    src={element.picUrls}
                    alt={element.itemTitle}
                    className="item-image"
                  />
                </div>
                <div className="item-details">
                  <p className="item-description">{element.description}</p>
                  <p className="item-cost">Rs {element.itemCost}</p>
                  <p className="item-discount">
                    Discount: {element.discount} %
                  </p>
                  <p className="item-category">#{element.category}</p>
                </div>
                <button
                  onClick={() => navigate("/order/payment")}
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
