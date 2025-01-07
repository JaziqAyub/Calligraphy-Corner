import React, { useContext } from "react";
import { ContextJ } from "../../context/Store";
import "./Shop.css";

const Shop = () => {
  const { user } = useContext(ContextJ);
  return (
    <div className="items">
      {user.items &&
        user.items.map((element, index) => (
          <div className="item" key={element.id || index}>
            <h3>{element.itemTitle}</h3>
            <img src={element.picUrls} alt={element.itemTitle} />
            <p>{element.description}</p>
            <p>Item Cost Rs {element.itemCost}</p>
            <p>Discount {element.discount} %</p>
            <p>{element.category}</p>
            <button>Buy now</button>
          </div>
        ))}
    </div>
  );
};

export default Shop;
