import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import "./Shop.css";
import EditForm from "../atoms/EditForm";
import { MdDelete, MdEdit } from "react-icons/md";
// import Order from "./Order";


const Shop = () => {
  const { user, deleteItemById, createOrder } = useContext(ContextJ);
  const [editForm, setEditForm] = useState(false);
  // const [showOrder, setShowOrder] = useState(false);


  const formData = {
    paymentMode: "card",
        shippingAddress: "Bemina",
        landmark: "Hospital",
      city: "Sgr",
        postalCode: "190018",
  }
  return (
    <>
      { editForm ? (
        <EditForm setEditForm={setEditForm} />
      ) : (
        <div className="items">
          {user.items &&
            user.items.map((element, index) => (
              <div className="item" key={element.id || index}>
                <div className="item-header">
                  <h3 className="item-title">{element.itemTitle}</h3>
                  <div className="item-actions">
                    <MdEdit
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => {
                        sessionStorage.setItem("itemId", element._id);
                        setEditForm(true);
                      }}
                    />
                    <MdDelete
                      style={{ color: "maroon", cursor: "pointer" }}
                      onClick={() => {
                        alert("Do you want to delete this item?");
                        deleteItemById(element._id);
                      }}
                    />
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
                  onClick={async () => {
                  createOrder(element._id, formData);
                  }}
                  className="buy-now-btn"
                >
                  Buy Now
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Shop;
