import React, { useContext } from 'react'
import { ContextJ } from '../../context/Store'
import { useParams } from 'react-router-dom'

const OrderPayment = () => {
    const {orderId} = useParams()
    const {cancelOrder} = useContext(ContextJ)
  return (
    <div style={{"textAlign" : "center", "marginTop" : "70px"}}>
      OrderPayment

      <button onClick={()=>{
        cancelOrder(orderId)
      }}> Cancel Order</button>
    </div>
  )
}

export default OrderPayment
