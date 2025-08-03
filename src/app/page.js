'use client'
import Image from "next/image";
import styles from "./page.module.css";
import C_header from "./_components/c_header";
import Footer from "./_components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setlocations]= useState([])
  const [resturant, setresturant]= useState([])
  const [selectlocation, setselectlocations]= useState(false)
  const [clicklocation, setclicklocation]= useState("")
  const router=useRouter()
  useEffect(()=>{
    loadlocations();
    loadresturant();
  },[])
  const loadlocations=async()=>{
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json()
    if(response.success){
      setlocations(response.result)
    }
  }
  const handlelistitem=(item)=>{
    setclicklocation(item)
     setselectlocations(false)
     loadresturant({location:item})
  }
  const loadresturant=async(params)=>{
    let url="http://localhost:3000/api/customer"
    if(params?.location){
      url = url+"?location="+params.location
    }else if(params?.resturant){
      url = url+"?resturant="+params.resturant
    }
    let response=await fetch(url)
    response = await response.json()
    if(response.success){
      setresturant(response.result)
    }
  }
  return (
    <main >
      <C_header></C_header>
      <div className="main-banner">
        <h1>Food Delivery App</h1>
        <div className="input-search">
         <input type="text" value={clicklocation} className="select-input" onChange={(event)=>loadresturant({location:event.target.value})} onClick={()=>setselectlocations(!selectlocation)} placeholder="Select Place"></input>
         <ul className="location-list">
            {
              selectlocation && locations.map((item)=>(
                <li key={item} onClick={()=>handlelistitem(item)}>{item}</li>
              ))
            }
         </ul>
          <input type="text" className="search-input" onChange={(event)=>loadresturant({resturant:event.target.value})} placeholder="Enter Food Or Resturant"></input>
        </div>
      </div>
      <div className="resturant-container">
          {
            resturant.map((item)=>(
              <div key={item.username} onClick={()=>router.push("explore/"+ item.username+"?id="+item._id)} className="resturant-wrapper">
                <div className="heading-wrapper">
              <h3>{item.username}</h3>
              <h5>Contact: {item.contact}</h5>
                </div>
                <div className="address-wrapper">
                  <div>City: {item.address}, </div>
                  <div>Email: {item.email}</div>
                </div>
        </div>
            ))
          }
      </div>
      <Footer></Footer>
    </main>
  );
}
