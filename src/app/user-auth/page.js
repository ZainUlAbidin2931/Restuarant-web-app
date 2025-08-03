'use client'
import { useEffect, useState } from "react"
import C_header from "../_components/c_header"
import Footer from "../_components/footer"
import User_signup from "../_components/user_signup"
import Usersignin from "../_components/usersignin"

const page=(props)=>{
    const [login, setlogin]= useState(false)
    const [loaded, setloaded]= useState(false)
    useEffect(()=>{
        setloaded(true)
    },[])
    return(
        <div className="container">
        
        <C_header></C_header>
        <div className="sign">
            {login?<Usersignin redirect={props.searchParams}></Usersignin>:<User_signup redirect={props.searchParams}></User_signup>}
              <button className="login-button" onClick={()=>setlogin(!login)}> 
                   {login?"Don't have an account! signup":"Already have an account! signin"}</button>
                </div>
        <Footer></Footer>
        </div>
    )
}
export default page