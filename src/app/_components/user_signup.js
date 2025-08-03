import { useRouter } from "next/navigation"
import { useState } from "react"

const User_signup=(props)=>{
    const [username, setusername]= useState('')
    const [email,setemail]=useState('')
    const [address, setaddress]= useState('')
    const [city, setcity]= useState('')
    const [contact, setcontact]= useState('')
    const [password, setpassword]=useState('')
    const [c_password, setc_password]= useState('')
    const [error, seterror]=useState(false)
    const [passworderror, setpassworderror]= useState(false)
    const router= useRouter()
    const handlesignup=async()=>{
        if(!username || !email || !city || !address || !contact || !password || !c_password){
            seterror(true)
        }
        if(password!==c_password){
            setpassworderror(true)
        }
        let response= await fetch("http://localhost:3000/api/user",{
            method:'POST',
            body: JSON.stringify({username,email,city, address,contact,password})
        })
        response= await response.json()
        if(response.success){
            let { result } =response
            delete result.password
            console.log(result)
            localStorage.setItem('user',JSON.stringify(result))
             if(props?.redirect?.ordernow){
                router.push('/ordernow')
            }
            else{
                router.push('/')
            }
        }else{
            alert('SignUp Failed')
        }

    }
    return(
        <>
        <div className="signing">
            <h2>User SignUp</h2>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={username} onChange={(e)=>setusername(e.target.value)} placeholder="Enter Username"></input>
            {
                error && !username && <span className="input-error">Enter Valid Username</span>
            }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter Email"></input>
            {
                error && !email && <span className="input-error">Enter Valid Email</span>
            }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={address} onChange={(e)=>setaddress(e.target.value)} placeholder="Enter Address"></input>
            {
                error && !address && <span className="input-error">Enter Valid Address</span>
            }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={city} onChange={(e)=>setcity(e.target.value)} placeholder="Enter City"></input>
            {
                error && !city && <span className="input-error">Enter Valid City</span>
            }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={contact} onChange={(e)=>setcontact(e.target.value)} placeholder="Enter Contact"></input>
            {
                error && !contact && <span className="input-error">Enter Valid Contact</span>
            }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Password"></input>
            {
                error && !password && <span className="input-error">Enter Valid Password</span>
            }
            {
                passworderror && password && c_password && <span className="input-error">Password and Confirm Password Doesn't Match  </span>
            }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={c_password} onChange={(e)=>setc_password(e.target.value)} placeholder="Confirm Password"></input>
            {
                error && !c_password && <span className="input-error">Enter Valid Confirm Password</span>
            }
             {
                passworderror && password && c_password && <span className="input-error">Password and Confirm Password Doesn't Match  </span>
            }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handlesignup}>Signup</button>
            </div>

        </div>
        </>
    )
}
export default User_signup