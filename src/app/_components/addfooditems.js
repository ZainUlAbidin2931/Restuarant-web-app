import { useRouter } from "next/navigation";
import { useState } from "react";
const Addfooditem=(props)=>{
    const [name,setname]=useState("")
    const [price,setprice]=useState("")
    const [path,setpath]=useState("")
    const [description,setdescription]=useState("")
    const [fooderror, setfooderror] = useState(false)
    const router= useRouter()
    const handleadditem=async()=>{
          const resturantData=JSON.parse(localStorage.getItem("resturantuser"))
          let resto_id
          if(resturantData){
               resto_id = resturantData._id
          }
          if(!name || !price || !path || !description){
               setfooderror(true)
               return
          }

        let response = await fetch("http://localhost:3000/api/resturant/foods",{
            method:"POST",
            body: JSON.stringify({name, price, path, description,resto_id}),
        })
        response = await response.json();
        if(response.success){
          alert("Food Item Added")
          props.setadditem(false)
        }
        else{
          alert("Food Item is not added")
        }
    }
    return(
    <div className="container">
   <h1>
   Add Foods Item
   </h1> 
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Food Name" id="name" onChange={(event)=>setname(event.target.value)}></input>
        { fooderror && !name && <span className="input-error" >Enter Food Name</span>}
   </div>
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Price" id="price" onChange={(event)=>setprice(event.target.value)}></input>
        { fooderror && !price && <span className="input-error" >Enter Food Price</span>}
   </div>
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Path" id="path" onChange={(event)=>setpath(event.target.value)}></input>
        { fooderror && !path && <span className="input-error" >Enter Food Path</span>}

   </div>
   <div className="input-wrapper">
        <input type="text" className="input-field" placeholder="Enter Description" id="description" onChange={(event)=>setdescription(event.target.value)}></input>
        { fooderror && !description && <span className="input-error" >Enter Food Description</span>}

   </div>
   <div>
        <button className="button" onClick={handleadditem}>Add Item</button>
   </div>
    </div>
    )
}
export default Addfooditem;