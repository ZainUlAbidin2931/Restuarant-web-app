'use client'
import { useEffect, useState } from "react"
import Deliveryheader from "../_components/deliveryheader"
import Deliverysignup from "../_components/deliverysignup"
import Footer from "../_components/footer"
import DeliverySignin from "../_components/deliverysignin"

const page=()=>{
    const [loaded, setloaded]= useState(false)
    const [login, setlogin]= useState(true)
    useEffect(()=>{
        setloaded(true)
    },[])
    return(
        <div className="container">
        <Deliveryheader></Deliveryheader>
            <div className="sign">
        <h1>Delivey Partner</h1>
        {
            !login?
            <Deliverysignup></Deliverysignup>:
        <DeliverySignin></DeliverySignin>
        }
        <button className="login-button" onClick={()=>setlogin(!login)}>{login?"Don't have an account! Signup":"Already have an account! Signin"}</button>
        </div>
        <Footer></Footer>
        </div>
    )
}
export default page