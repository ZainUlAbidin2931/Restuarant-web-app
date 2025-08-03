import { useEffect, useState } from "react"
import C_header from "./c_header"
import { Delivery_charges, TAX } from "../lib/constant"

const Payment = ()=>{
const [acc_no, setacc_no]= useState('')
const [pin, setpin]= useState('')
const [error, seterror]= useState(false)
const [userstorageid, setuserstorageid]= useState('')
const [ deliverypartnerid, setdeliverypartnerid]= useState('')
const [cartstorage, setcartstorage]= useState([])
const [totalprice, settotalprice]= useState('')
useEffect(() => {
    if (cartstorage.length > 0) {
      const total = cartstorage.reduce((sum, item) => sum + Number(item.price), 0);
      settotalprice(total);
    } else {
      settotalprice(0);
    }
  }, [cartstorage]);
useEffect(()=>{
    if(localStorage.getItem('user')){
        setuserstorageid(JSON.parse(localStorage.getItem('user')._id))
    }if(localStorage.getItem('cart')){
        setcartstorage(JSON.parse(localStorage.getItem('cart')))
    }if(localStorage.getItem('deliverypartner')){
        setdeliverypartnerid(JSON.parse(localStorage.getItem('deliverypartner'))._id)
    }
},[])
const handlepayment =async()=>{
    if(!acc_no || !pin){
        seterror(true)
        return
    }
    let amount = totalprice+ Delivery_charges+ TAX
    let fooditemsid= cartstorage.map((item)=>item._id).toString()
    let resto_id= cartstorage.resto_id
    
}
    return(
       <div className="signing">
                <div className="input-wrapper">
                    <input className="input-field" value={acc_no} onChange={(e)=>setacc_no(e.target.value)} placeholder="Enter Account Number" required></input>
                    {
                        error && !acc_no && <span className="input-error">Enter Valid Account Number</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input className="input-field" value={pin} onChange={(e)=>setpin(e.target.value)} placeholder="Enter Your PIN" required></input>
                {
                        error && !pin && <span className="input-error">Enter Valid Account Pin</span>
                    }
                </div>
                <button className="button" onClick={handlepayment}>Pay</button>
       </div> 
    )
}
export default Payment