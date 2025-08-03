import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Signin=()=>{
    const [username, setusername]= useState("");
    const [password, setpassword]= useState("");
    const [error, seterror] = useState(false);
    const router = useRouter();
    const handlesignin=async()=>{
       if( !username || !password ){
             seterror(true)
             return
       }
       else{
           seterror(false);
       }
       let response = await fetch("http://localhost:3000/api/resturant",{
        method: "POST",
        body: JSON.stringify({username,password,login:true})
       })
       response = await response.json()
       if(response.success){
        let {result} = response;
        delete result.password;
        localStorage.setItem("resturantuser", JSON.stringify(result))
        alert("Login Successfully")
        
        router.push("/resturant/dashboard")
       }
    }
    return(
        <>
        <div className="signing">
            <h2>Sign in</h2>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="username" placeholder="Enter UserName" required value={username} onChange={(event)=>setusername(event.target.value)}></input>
                 { error && !username && <span className="input-error">Enter Valid Username</span>}
            </div>
            <div className="input-wrapper">
                 <input className="input-field" type="text" id="password" placeholder="Enter Password" required value={password} onChange={(event)=>setpassword(event.target.value)}></input>
                { error && !password && <span className="input-error">Enter Valid Password</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handlesignin}>Sign in</button>
            </div>
        </div>
        </>
    )
}
export default Signin;