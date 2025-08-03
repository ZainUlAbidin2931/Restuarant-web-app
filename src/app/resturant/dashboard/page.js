'use client'
import Header from "../../_components/header";
import '../style.css'
import Footer from "../../_components/footer";
import { useState } from "react";
import Addfooditem from "../../_components/addfooditems";
import Fooditemlist from "../../_components/fooditemlist";
const Dashboard=()=>{
    const [additem, setadditem] = useState(false)
    return(
        <>
        <Header></Header>
        <button onClick={()=>setadditem(true)}>Add Food Items</button>
        <button onClick={()=>setadditem(false)}>Dashboard</button>
            {
                additem?<><Addfooditem setadditem={setadditem}></Addfooditem></>: <><Fooditemlist></Fooditemlist></>
            }
        <Footer></Footer>
        </>
    )
}
export default Dashboard;