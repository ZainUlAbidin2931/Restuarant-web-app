import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup=()=>{
          const [username, setusername ]=useState("");
          const [email, setemail ]=useState("");
          const [address, setaddress]=useState("");
          const [contact, setcontact ]=useState("");
          const [city, setcity]= useState('')
          const [password, setpassword ]=useState("");
          const [c_password, setc_password ]=useState("");
          const [error, seterror]=useState(false)
          const [p_error, setp_error ]=useState(false)
          const router = useRouter()
     const handlesignup=async()=>{
          if( !username || !email || !city || !address || !contact || !password || !c_password){
               seterror(true);
               return
          }
          else{
               seterror(false)
          }
          if( password !== c_password){
               setp_error(true)
               return
          }
          else{
               setp_error(false)
          }
          
          let response = await fetch("http://localhost:3000/api/resturant",{
               method: "POST",
               body: JSON.stringify({username, email, city, address, contact, password}),
          })
          response = await response.json();
          if(response.success){
               let { result } = response ;
               delete result.password;
               localStorage.setItem("resturantuser",JSON.stringify(result));
               router.push("./resturant/dashboard");
          }
          else{
               alert("Request Doesn't Process")
          }

     
     }

     return(
        <>
        <div className="signing">
            <h2>Sign up</h2>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="username" placeholder="Enter UserName" required value={username} onChange={(e)=>setusername(e.target.value)}></input>
                 { error && !username && <span className="input-error">Enter Valid Username</span>}
            </div>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="email" placeholder="Enter Email" required value={email} onChange={(e)=>setemail(e.target.value)}></input>
                 { error && !email && <span className="input-error">Enter Valid Email</span>}
            </div>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="address" placeholder="Enter Address" required value={address} onChange={(e)=>setaddress(e.target.value)}></input>
                 { error && !address && <span className="input-error">Enter Valid Address</span>}
            </div>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="city" placeholder="Enter City" required value={city} onChange={(e)=>setcity(e.target.value)}></input>
                 { error && !city && <span className="input-error">Enter Valid City</span>}
            </div>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="contact" placeholder="Enter Contact" required value={contact} onChange={(e)=>setcontact(e.target.value)}></input>
                 { error && !contact && <span className="input-error">Enter Valid Contact</span>}
            </div>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="password" placeholder="Enter Password" required value={password} onChange={(e)=>setpassword(e.target.value)}></input>
                 { error && !password && <span className="input-error">Enter Valid Password</span>}
            </div>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="c_password" placeholder="Confirm Password" required value={c_password} onChange={(e)=>setc_password(e.target.value)}></input>
                 { error && !c_password && <span className="input-error">Enter Valid Confirm Password</span>}
                 { p_error && password && c_password && <span className="input-error">Password and Confirm Password Doesn't Match</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handlesignup}>Sign up</button>
            </div>
        </div>
        </>
    )
}
export default Signup;