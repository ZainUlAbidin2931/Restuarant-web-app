'use client'
import { useEffect, useState } from "react"
import C_header from "../_components/c_header"
import Footer from "../_components/footer"
import { Delivery_charges, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"
const page=()=>{
    const [cartstorage, setcartstorage]= useState([])
    const [totalprice, settotalprice]= useState(0)
    const [userstorage, setuserstorage]= useState([])
    useEffect(()=>{
        let cartdata=JSON.parse(localStorage.getItem('cart'))
        let user_data= JSON.parse(localStorage.getItem('user'))
        if(cartdata){
        setcartstorage(cartdata)
    }
        if(user_data){
            setuserstorage(user_data)
        }
  },[])
  useEffect(() => {
    if (cartstorage.length > 0) {
      const total = cartstorage.reduce((sum, item) => sum + Number(item.price), 0);
      settotalprice(total);
    } else {
      settotalprice(0);
    }
  }, [cartstorage]);

  const [removecartitem, setremovecartitem]= useState(false)
  const router= useRouter()
    const handleorder=async()=>{
        let f_amount = totalprice+Delivery_charges+(totalprice*TAX/100)
        let user_id = JSON.parse(localStorage.getItem('user'))._id
        let user_city = JSON.parse(localStorage.getItem('user')).city
        let cart = JSON.parse(localStorage.getItem('cart'))
        let fooditemsid = cart.map((items)=>items._id).toString() 
        let deliveryboyresponse = await fetch('http://localhost:3000/api/deliverypartner/'+user_city) 
        deliveryboyresponse= await deliveryboyresponse.json()
        let deliveryboyids = deliveryboyresponse.result.map((item)=>item._id)
        let deliveryboyid = deliveryboyids[Math.floor(Math.random()*deliveryboyids.length)]
        if(!deliveryboyid){
            alert("Delivery Partner Not Available")
            return false
        }
        let resto_id = cart[0].resto_id
        let address= JSON.parse(localStorage.getItem('user')).address

        let collection = {
            user_id, address, fooditemsid, deliveryboyid, resto_id, status:'confirm', amount:f_amount
        }
        let response = await fetch('http://localhost:3000/api/order',{
            method:'POST',
            body:JSON.stringify(collection),
        })
        response = await response.json()
        if(response.success){
            alert('order placed')
            setremovecartitem(true)
            router.push('userprofile')
        }else{
            alert("order doesn't placed")
        }
    }
    return(
        <>
        <C_header removecartitem= {removecartitem}></C_header>
        <div className="total-wrapper">
            <div className="block-1">
            <h2>User Detail</h2>
            <div className="row">
                <span>Name: </span>
                <span>{userstorage.username}</span>
            </div>
             <div className="row">
                <span>contact: </span>
                <span>{userstorage.contact}</span>
            </div>
             <div className="row">
                <span>address: </span>
                <span>{userstorage.address}</span>
            </div>
            <h2>Amount</h2>
            <div className="row">
                <span>Food Charges: </span>
                <span>{totalprice.toFixed(2)}</span>
            </div>
            <div className="row">
                <span>Tax Charges: </span>
                <span>{(totalprice*(TAX/100)).toFixed(2)}</span>
            </div>
            <div className="row">
                <span>Deliver Charges: </span>
                <span>{Delivery_charges.toFixed(2)}</span>
            </div>
            <div className="row">
                <span>Total Amount: </span>
                <span>{(totalprice+Delivery_charges+(totalprice*TAX/100)).toFixed(2)}</span>
            </div>
            <h2>Payment</h2>
            <div className="row">
                <span>Payment Method: </span>
                <span>Cash on Delivery</span>
            </div>
            </div>
            <div className="block-2">
                <button onClick={handleorder}>Order Now</button>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
export default page