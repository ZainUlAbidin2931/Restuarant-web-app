'use client'
import { useEffect, useState } from "react"
import C_header from "../_components/c_header"
import Footer from "../_components/footer"
import { Delivery_charges, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"
const page=()=>{
    const [cartstorage, setcartstorage]= useState([])
    const [totalprice, settotalprice]= useState(0)
    const [isloaded, setisloaded]= useState(false)
    const router= useRouter()
    useEffect(()=>{
        setisloaded(true)
    },[])
    useEffect(()=>{
        let cartdata=JSON.parse(localStorage.getItem('cart'))
        if(cartdata){
        setcartstorage(cartdata)
    }
  },[])
  const handleorder=()=>{
    if(localStorage.getItem('user')){
        router.push('/ordernow')
    }
    else{
        router.push('/user-auth?ordernow=true')
    }
  }
  useEffect(() => {
    if (cartstorage.length > 0) {
      const total = cartstorage.reduce((sum, item) => sum + Number(item.price), 0);
      settotalprice(total);
    } else {
      settotalprice(0);
    }
  }, [cartstorage]);

    const removefromcart=(id)=>{}
    return(
        <>
        <C_header></C_header>
        <div className='fooditem-wrapper'>
            {
            cartstorage && cartstorage.map((item)=>(
                <div key={item._id} className='fooditem'>
                    <div className="list-block-1"><img style={{width:100}} src={item.path}></img></div>
                    <div className="list-block-2">
                    <div>{item.name}</div>
                    <div className='description'>{item.description}</div>
                    <button onClick={()=>removefromcart(item._id)}>Remove from Cart</button>
                    </div>
                     <div className="list-block-3">Price: {item.price}</div>
                    
                </div>
            ))
        }
        </div>
        <div className="total-wrapper">
            <div className="block-1">
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