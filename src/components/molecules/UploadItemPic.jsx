import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./UploadItemPic.scss";

const UploadItemPic = ({ showUploadForm, setShowUploadForm }) => {
  const { UploadItemPicture } = useContext(ContextJ);
  const itemId = sessionStorage.getItem("itemId");
  const [image, setImage] = useState(null);
  const [loadImage, setLoadImage] = useState(false);


  //   converting into base64
  const handleImage = (e) => {
    const file = e.target.files[0];// Get the file from the input
    const reader = new FileReader();
    reader.readAsDataURL(file);  // Convert file to base64 string
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
    <div>
      <img src={image} alt="item pic" width={300} />

      <label htmlFor="fileupload"> Click Here To Upload Item Pictures </label>
      <input
        id="fileupload"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          handleImage(e);
        }}
      />
      {/*{{above image is not readable, weve to convert it first to base64 url to make it readable, image of usestate}} */}
      <button
        disabled={!loadImage}
        onClick={async () => {
          if (itemId !== null) {
            const upload = await UploadItemPicture(formData, itemId);
            if (upload) {
              // showUploadForm(false)
              // setShowUploadForm(false)
              toast.success("Item created Successfully");
              navigate("/shop");
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
