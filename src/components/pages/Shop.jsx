import React, { useContext, useState } from "react";
import { ContextJ } from "../../context/Store";
import "./Shop.css";
import EditForm from "../atoms/EditForm";
import { MdDelete, MdEdit } from "react-icons/md";
// import EditForm from "../atoms/EditForm";

const Shop = ({ showUploadForm, setShowUploadForm, setShowForm}) => {
  const { user, deleteItemById } = useContext(ContextJ);
  const [editForm, setEditForm] = useState(false)



  return (
    <>
   { editForm ? <EditForm  /> : <div className="items">
      {user.items &&
        user.items.map((element, index) => (
          <div className="item" key={element.id || index}>
            <h3>{element.itemTitle} </h3>

            <h3 onClick={()=>{setEditForm(true)}}><MdEdit style={{"color":"green", "cursor":"pointer"}}/></h3>
            <h3 onClick={()=>{deleteItemById(element._id)}}><MdDelete style={{"color":"maroon", "cursor":"pointer"}}/></h3>


            <img  src={element.picUrls} alt={element.itemTitle} />
            <p>{element.description}</p>
            <p>Item Cost Rs {element.itemCost}</p>
            <p>Discount {element.discount} %</p>
            <p>{element.category}</p>
            <button>Buy now</button>
          </div>
        ))}
    </div>}
    </>
  );
};

export default Shop;
