import React, { useContext, useEffect, useState } from "react";
import "../molecules/CreateItem.scss";
import { ContextJ } from "../../context/Store";
import { ImForward } from "react-icons/im";

const EditForm = ({ setShowForm }) => {
  const { editItemById, getItemById, item } = useContext(ContextJ);

  const [formData, setFormData] = useState(item)
 const itemId = "67828492ad1b0e683d2b9b4d"

 useEffect(()=>{

  getItemById(itemId)

} , [getItemById , itemId])




const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevInput) => ({ ...prevInput, [name]: value }));
};

  return (
    <>
      <div className="edititem">
        <h3>Edit your item</h3>
        <form>
          <input
            type="text"
            placeholder="Item Title"
            name="itemTitle"
            value={formData.itemTitle}
            onChange={handleChange}
          />
          <textarea
            className="description"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Item Cost"
            name="itemCost"
            value={formData.itemCost}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Item Discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </form>
        <button
          onClick={async () => {
            const item = await editItemById(itemId, formData);

            if (item) {
              // setShowForm(false);
              console.log("success")
              
            }
          }}
        >
          Save
        </button>
       
        <button
                  className="create"
                  onClick={async() => {
                    const item =  await editItemById(itemId , formData);

                 
                    if(item){
                      setFormData({
                        itemTitle: "",
                        description : "",
                        itemCost: "",
                        discount: "",
                        category: "",
                      });
                      
                      // setShowUploadForm(true)
                    }
                      
                  }}
                >
                  Edit and continue <ImForward style={{ fontSize: "22px"  , marginLeft : "10px"}} />
                </button>



       
      </div>
      
    </>
  );
};

export default EditForm;
