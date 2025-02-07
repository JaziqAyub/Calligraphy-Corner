import React, { useContext, useState } from "react";
import "./AdminProfile.css";
import { ContextJ } from "../../context/Store";
import CreateItem from "../molecules/CreateItem";
// import Shop from "./Shop";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(ContextJ);
  // console.log(user);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  // const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <>
      <div className="main-container">
        {showForm ? (
          <CreateItem
            setShowForm={setShowForm}
            // showUploadForm={showUploadForm}
            // setShowUploadForm={setShowUploadForm}
          />
        ) : (
          <div className="heading">
            This Profile belongs to {user.username} who is the {user.role} of
            this website and you've created {user.items && user.items.length}{" "}
            {user.items && user.items.length === 1 ? "item" : "items"}.
          </div>
        )}
        {showForm ? (
          ""
        ) : (
          <div>
            <button
              onClick={() => {
                setShowForm(true);
              }}
            >
              Add Item
            </button>
            <button onClick={() => navigate("/adminshop")}>Admin Shop</button>
          </div>
        )}
      </div>
    </>
  );
};
export default UserProfile;
