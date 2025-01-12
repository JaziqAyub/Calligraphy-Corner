import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./UploadItemPic.scss";

const UploadItemPic = () => {
  const { UploadItemPicture } = useContext(ContextJ);
  const itemId = sessionStorage.getItem("itemId");
  const [image, setImage] = useState(null);
  const [loadImage, setLoadImage] = useState(false);
  //   converting into base64
  const handleImage = (e) => {
    const file = e.target.files[0]; // Get the file from the input
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to base64 string
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result); // Store base64 string in state
        setLoadImage(true);
      }
    };
  };

  const formData = new FormData();
  formData.append("image", image);
  const navigate = useNavigate();

  return (
    <div className="upload-item-pic">
      <div className="image-preview">
        {image ? (
          <img src={image} alt="Preview of uploaded item" />
        ) : (
          <p>No image uploaded yet.</p>
        )}
      </div>
      <label htmlFor="file-upload" className="upload-label">
        Click Here To Upload Item Pictures
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleImage}
        className="file-input"
      />
            {/*{{above image is not readable, weve to convert it first to base64 url to make it readable, image of usestate}} */}
      <button
        className={`submit-btn ${!loadImage ? "disabled" : ""}`}
        disabled={!loadImage}
        onClick={async () => {
          if (itemId !== null) {
            const upload = await UploadItemPicture(formData, itemId);
            if (upload) {
              navigate("/shop");
              toast.success("Item created successfully!");
            }
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default UploadItemPic;
