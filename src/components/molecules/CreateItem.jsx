import React, { useContext, useState } from "react";
import "./CreateItem.scss";
import { ContextJ } from "../../context/Store";
import { useNavigate } from "react-router-dom";

const CreateItem = ({ setShowForm }) => {
  const { createItems } = useContext(ContextJ);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemTitle: "",
    itemCost: "",
    discount: "",
    description: "",
    category: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  return (
    <div className="createitem">
      <h3>Create a new item</h3>

      <form>
        <input
          type="text"
          placeholder="Item Title"
          name="itemTitle"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Item Cost"
          name="itemCost"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Item Discount"
          name="discount"
          onChange={handleChange}
        />
        <input
          type="text"N
          placeholder="Category"
          name="category"
          onChange={handleChange}
        />
      </form>
      <button>Upload Pictures</button>

      <button
        onClick={() => {
          createItems(formData);
          navigate("/shop");
        }}
      >
        Submit
      </button>

      <button
        onClick={() => {
          setShowForm(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateItem;
