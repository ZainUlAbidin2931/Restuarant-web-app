'use client'
import Deliveryheader from "../../_components/deliveryheader"
import Footer from "../../_components/footer"
import { useEffect, useState } from "react"

const page=()=>{
    const [order, setorder]= useState([])
        useEffect(()=>{
            handleorder()
        },[])
        const handleorder=async()=>{
        const deliveryboy = JSON.parse(localStorage.getItem('deliverypartner'))
        let response = await fetch('http://localhost:3000/api/deliverypartner/orders/'+deliveryboy._id)
        response= await response.json()
        if(response.success){
            setorder(response.result)
        }
    }
    return(
        <>
        <Deliveryheader></Deliveryheader>
        {
            order.map((item, key)=>(
                <div key={key} className="resturant-wrapper" style={{marginLeft:'auto', marginRight:'auto'}}>
                    <h4>Name: {item.data.username}</h4>
                    <div>amount: {item.amount}</div>
                     <div>address: {item.data.address}</div>
                      <div>Update status: <select>
                        <option>Confirm</option>
                        <option>On the Way</option>
                        <option>Delivered</option>
                        <option>Delivery Failed</option>
                        </select></div>
                </div>

            ))
        }
        <Footer></Footer>
        </>
    )
}
export default page