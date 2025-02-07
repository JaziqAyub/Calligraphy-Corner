// import React, { useContext, useState } from "react";
// import { ContextJ } from "../../context/Store";

// const Order = () => {
//   const { user, item, createOrder } = useContext(ContextJ);
//   const [formData, setFormData] = useState({
//     paymentMode: "",
//     shippingAddress: "",
//     landmark: "",
//     city: "",
//     postalCode: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevInput) => ({ ...prevInput, [name]: value }));
//   };

//   return (
//     <>
//       <div className="orders">
//         {user.items &&
//           user.items.map((element) => <div className="order"></div>)}
//       </div>
//       {/* 
//       {user.items[0]._id} */}

//       <h3>Please fill your order details</h3>
//       <div>
//         <form>
//           <select
//             id="paymentMode"
//             name="paymentMode"
//             value={formData.paymentMode}
//             onChange={handleChange}
//           >
//             <option value="" disabled>
//               Select Payment Mode
//             </option>
//             <option value="Card">card</option>
//             <option value="COD">cod</option>
//             <option value="Online">online</option>
//           </select>

//           {/* <label htmlFor="shippingAddress">Shipping Address</label> */}

//           <input
//             type="text"
//             id="city"
//             placeholder="Enter your city"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             id="landmark"
//             placeholder="Enter landmark"
//             name="landmark"
//             value={formData.landmark}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             id="postalCode"
//             placeholder="Enter postal code"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//           />

//           <button
//             onClick={() => {
//               createOrder();
//             }}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Order;
