import React, { useContext, useState } from "react";
import "./CreateItem.scss";
import { ContextJ } from "../../context/Store";
import { useNavigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import UploadItemPic from "./UploadItemPic";

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

  const [showUploadForm, setShowUploadForm] = useState(false);

  const [showUpload, setShowUpload] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  return (
    <>
      {showUploadForm ? (
        <UploadItemPic
          setShowForm={setShowForm}
          setShowUploadForm={setShowUploadForm}
        />
      ) : (
        <div className="createitem">
          <h3>Create a new item</h3>

          {showUpload ? (
            <button>Upload Pictures</button>
          ) : (
            <form>
              <input
                type="text"
                placeholder="Item Title"
                name="itemTitle"
                onChange={handleChange}
              />
              <textarea
                className="description"
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
                type="text"
                placeholder="Category"
                name="category"
                onChange={handleChange}
              />
            </form>
          )}

          {showUpload ? (
            ""
          ) : (
            <button
              onClick={async () => {
                await createItems(formData);
                // setShowUpload(true);
                setShowUploadForm(true);
              }}
            >
              Save and Continue
            </button>
          )}

          {showUpload ? (
            <div>
              <button
                onClick={() => {
                  // createItems(formData);
                  navigate("/shop");
                }}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowUpload(false);
                }}
              >
                {" "}
                <AiOutlineRollback /> Back
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CreateItem;
