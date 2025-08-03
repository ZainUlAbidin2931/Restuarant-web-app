'use client'

import { useEffect, useState } from "react"
import C_header from "../_components/c_header"
import Footer from "../_components/footer"

const page=()=>{
    const [order, setorder]= useState([])
    useEffect(()=>{
        handleorder()
    },[])
    const handleorder=async()=>{
    const userstorage = JSON.parse(localStorage.getItem('user'))
    let response = await fetch('http://localhost:3000/api/order?id='+userstorage._id)
    response= await response.json()
    if(response.success){
        setorder(response.result)
    }
}
    return(
        <>
        <C_header></C_header>
        {
            order.map((item, key)=>(
                <div key={key} className="resturant-wrapper" style={{marginLeft:'auto', marginRight:'auto'}}>
                    <h4>Name: {item.data.username}</h4>
                    <div>amount: {item.amount}</div>
                     <div>address: {item.data.address}</div>
                      <div>status: {item.status}</div>
                </div>

            ))
        }
        <Footer></Footer>
        </>
    )
}
export default page