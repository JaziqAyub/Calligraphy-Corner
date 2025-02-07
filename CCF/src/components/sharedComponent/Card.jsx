import React from "react";

const Card = (props) => {
  return (
    <div>
      <h1>
        {props.happyMessage}{props.shop}
      </h1>
    </div>
  );
};

export default Card;
