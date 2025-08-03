import { useRouter } from "next/navigation"
import { useState } from "react"

const Deliverysignup=(props)=>{
    const [username, setusername]= useState('')
    const [address, setaddress]= useState('')
    const [contact, setcontact]= useState('')
    const [city, setcity]= useState('')
    const [password, setpassword]=useState('')
    const [c_password, setc_password]= useState('')
    const [error, seterror]=useState(false)
    const [passworderror, setpassworderror]= useState(false)
    const router= useRouter()
    const handlesignup=async()=>{
        if(!username || !city ||  !address || !contact || !password || !c_password){
            seterror(true)
            return
        }
        if(password!==c_password){
            setpassworderror(true)
            return
        }else{
            setpassworderror(false)
        }
        let response = await fetch('http://localhost:3000/api/deliverypartner',{
            method:'POST',
            body:JSON.stringify({username, address, city, contact, password})
        })
        response = await response.json()
        if(response.success){
            alert("Registered Successfully")
            let {result}= response
            delete result.password
            localStorage.setItem('deliverypartner',JSON.stringify(result)) 
            router.push('/deliverpartner/dashboard')
        }else{
            alert('Registration Failed')
        }

    }
    return(
        <>
        <div className="signing">
            <h2>SignUp</h2>
            <div className="input-wrapper">
                <input className="input-field" type="text" value={username} onChange={(e)=>setusername(e.target.value)} placeholder="Enter Username"></input>
            {
                error && !username && <span className="input-error">Enter Valid Username</span>
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
                error && !city && <span className="input-error">Enter Valid city</span>
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
export default Deliverysignup