'use client'
import Header from "../../../_components/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Editfooditem=(props)=>{
    const [name,setname]=useState("")
    const [price,setprice]=useState("")
    const [path,setpath]=useState("")
    const [description,setdescription]=useState("")
    const [fooderror, setfooderror] = useState(false)
    const [loaded, setloaded] = useState(false)
     const router= useRouter()
    const params= useParams()
    const id = params?.id
    useEffect(()=>{
     setloaded(true)
    },[])
    const handleedititem=async()=>{
          if(!name || !price || !path || !description){
               setfooderror(true)
               return
          }
          console.log(name,price,path,description)
          let response = await fetch("http://localhost:3000/api/resturant/foods/edit/"+id,{
               method:"PUT",
               body:JSON.stringify({name, price, path, description})
          })
          response= await response.json()
          if(response.success){
               router.push("/resturant/dashboard")
          }else{
               alert("Item doesn't Update")
          }
     
    }
    useEffect(()=>{
     if(loaded && id){
          loadeditfooditems()
     }
    },[loaded,id])
    const loadeditfooditems=async()=>{
     let response = await fetch("http://localhost:3000/api/resturant/foods/edit/"+id)
     response = await response.json()
     if(response.success){
         setname(response.result.name)
         setprice(response.result.price)
         setpath(response.result.path)
         setdescription(response.result.description)
     }
    }
    return(
    <div className="container">
   <h1>
   Update Foods Item
   </h1> 
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Food Name" id="name" value={name} onChange={(event)=>setname(event.target.value)}></input>
        { fooderror && !name && <span className="input-error" >Enter Food Name</span>}
   </div>
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Price" id="price" value={price} onChange={(event)=>setprice(event.target.value)}></input>
        { fooderror && !price && <span className="input-error" >Enter Food Price</span>}
   </div>
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Path" id="path" value={path} onChange={(event)=>setpath(event.target.value)}></input>
        { fooderror && !path && <span className="input-error" >Enter Food Path</span>}

   </div>
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Description" id="description" value={description} onChange={(event)=>setdescription(event.target.value)}></input>
        { fooderror && !description && <span className="input-error" >Enter Food Description</span>}

   </div>
   <div className="input-wrapper">
        <button className="button" onClick={handleedititem}>Update Item</button>
   </div>
   <div className="input-wrapper">
        <button className="button" onClick={()=>router.push("/resturant/dashboard")}>Back To Dashboard</button>
   </div>
    </div>
    )
}
export default Editfooditem;
