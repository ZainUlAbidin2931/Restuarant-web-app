'use client'
import { useEffect, useState } from "react";
import Signin from "../_components/signin";
import Signup from "../_components/signup";
import "./style.css"
import Footer from "../_components/footer";
import Header from "../_components/header";
const Resturant=()=>{
    const [login, setlogin]=useState(true) 
     const [loaded, setloaded]= useState(false)
    useEffect(()=>{
        setloaded(true);
    },[])
    if(!loaded){
        return(
             <div className="logo">
                <img style={{width:100}} src="https://i.pinimg.com/736x/a7/36/c8/a736c8a0a5af369df75038a40beb7151.jpg"></img>
            </div>
        )
    }
    return(
        <>
        <div className="container">
            <Header></Header>
            <div className="sign">
            <h1>Khan Restaurant</h1>
            {
                login?<Signin /> :<Signup />
                }
            <button className="login-button" onClick={()=>setlogin(!login)}>
                {login?"don't have an account? Signup":"Already have an account? Signin"}
            </button>
            </div>
            <Footer></Footer>
        </div>
        </>
    )
}

export default Resturant;