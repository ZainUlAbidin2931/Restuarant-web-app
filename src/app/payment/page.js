'use client'
import { useEffect, useState } from "react"
import C_header from "../_components/c_header"
import Footer from "../_components/footer"
import Payment from "../_components/payments"

const page=()=>{
    const [loaded, setloaded]= useState(false)
    useEffect(()=>{
        setloaded(true)
    },[])
    return(
        <div className="container">
            <C_header></C_header>
            <div className="sign">
            <h1>Payment</h1>
            <Payment></Payment>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default page