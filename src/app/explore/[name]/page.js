'use client';
import { use, useState } from 'react';
import C_header from "../../_components/c_header";
import Footer from "../../_components/footer";
import { useEffect } from "react";
import { set } from 'mongoose';

const Page = ({ params, searchParams }) => {
    const [resto_detail, setrestodetail]= useState("")
    const [fooditems, setfooditems]= useState([])
  const { name } = use(params); // ✅ unwrap the Promise
  const { id } = use(searchParams); // ✅ unwrap searchParams too
  const [cart, setcart]= useState()
  const [cartstorage, setcartstorage]= useState()
  const [cart_id, setcart_id]= useState()
  const [removecart, setremovecart]= useState()

  useEffect(()=>{
    let cartdata=JSON.parse(localStorage.getItem('cart'))
    if(cartdata){
        setcartstorage(cartdata)
        setcart_id(()=>cartdata.map((item)=>{
    return item._id;
  }))
    }
  },[])

  useEffect(() => {
    loadResturant();
  }, []);

  const loadResturant = async () => {
      let response = await fetch("http://localhost:3000/api/customer/"+id);
      response = await response.json();
      console.log("Fetched:", response);
      setrestodetail(response.resto_detail)
      setfooditems(response.fooditems)
  };
  const removefromcart=(id)=>{
    setremovecart(id)
    var local_id=cart_id.filter(item=>item!=id)
    setcart_id(local_id)
    setcart()
  }
  const cartdetail=(item)=>{
    setcart(item)
    let localcartid=cart_id
    localcartid.push(item._id)
    setcart_id(localcartid)
    setremovecart()

  }
  return (
    <div>
      <C_header  cartData={cart} removeData={removecart} />
      <div className="resturant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
        <div className='detail-wrapper'>
            <h4>Contact: {resto_detail?.contact}</h4>
            <h4> Email: {resto_detail?.email}</h4>
            <h4>City: {resto_detail?.address}</h4>         
        </div>
        <div className='fooditem-wrapper'>
            {
            fooditems.length>0? fooditems.map((item)=>(
                <div key={item._id} className='fooditem'>
                    <div className='list-block-1'><img style={{width:100}} src={item.path}></img></div>
                    <div className='list-block-2'>
                    <div>{item.name}</div>
                    <div className='description'>{item.description}</div>
                    {
                        cart_id && cart_id.includes(item._id)?
                    <button onClick={()=>removefromcart(item._id)}>Remove from Cart</button>:
                    <button onClick={()=>cartdetail(item)}> Add to Cart</button>
                    }
                    </div>
                    <div className='list-block-3'>Price: {item.price}</div>
                    
                </div>
            ))
        :<h1>No Food Items Added Yet</h1>
        }
        </div>
      <Footer />
    </div>
  );
};

export default Page;
