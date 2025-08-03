import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const Fooditemlist=()=>{
    const[foodItems, setfoodItems]=useState([])
    const router = useRouter()
    useEffect(()=>{
        loadfooditem()
    },[])
    const loadfooditem=async()=>{
         const resturantData = JSON.parse(localStorage.getItem('resturantuser'));
         let resto_id
         if(resturantData){
             resto_id = resturantData._id
             let response = await fetch("http://localhost:3000/api/resturant/foods/"+resto_id);
             response = await response.json()
             if(response.success){
                 setfoodItems(response.result)
                }
                else{
                    alert("food is not Loading..")
                }
            }
    }

    const deleteitem=async(id)=>{
        let response = await fetch("http://localhost:3000/api/resturant/foods/"+id,{
            method:"delete"
        })
        response = await response.json()
        if(response.success){
            loadfooditem()
        }else{
            alert("Food item Doesn't Delete")
        }
    }
    return(
        <div className="container">
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <td>Item id</td>
                        <td>Item name</td>
                        <td>Item price</td>
                        <td>Item description</td>
                        <td>Item photo</td>
                        <td>Edit/Delete Items</td>
                    </tr>
                </thead>
                <tbody>
                        {
                           foodItems && foodItems.map((item,key)=>(
                            <tr key={key}>

                            <td>{key+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img src={item.path}></img></td>
                            <td><button onClick={()=>router.push("../resturant/dashboard/"+item._id)}>Edit</button><button onClick={()=>deleteitem(item._id)}>Delete</button></td>
                    </tr>
                        ))
                        }
                </tbody>
            </table>
        </div>
    )
}

export default Fooditemlist