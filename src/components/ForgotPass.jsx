import React, { useState } from 'react'
import "./ForgotPass.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPass = () => {
    const [email, setEmail] = useState("")


    const url = "http://localhost:4011/user/forgotPass"
    const formData = {
        email
    }

    const handleForgotPass = async (e)=>{
        try {
            e.preventDefault()

            const res = await axios.post(url, formData)
            toast.success(res.data.message)

        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div className='forgotpasscontainer'>
        <form>
            <input type='email' placeholder='Enter your email address' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </form>
        <div className='forgotbtn'>
        <button onClick={handleForgotPass}>Send Reset Link</button>
        </div>
    </div>
  )
}

export default ForgotPass
