import { set } from "mongoose"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const Usersignin=()=>{
    const [email, setemail]= useState('')
    const [password, setpassword]= useState('')
    const [error, seterror]=useState(false)
    const router= useRouter()
    const searchParams = useSearchParams()
    const handlesignin=async()=>{
        if(!email || !password){
            seterror(true)
        }
        let response = await fetch("http://localhost:3000/api/user",{
            method:'POST',
            body:JSON.stringify({email,password,login:true})
        })
        response= await response.json()
        if(response.success){
            let {result}= response
            delete result.password
            localStorage.setItem('user',JSON.stringify(result))
            if(searchParams.get('ordernow')==='true'){
                router.push('/ordernow')
            }
            else{
                router.push('/')
            }
        }
        else{
            seterror(true)
            alert("Login Failed")
        }
        
    }
    return(
        <>
        <div className="signing">
            <h2>User Sign in</h2>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Email" onChange={(e)=>setemail(e.target.value)}></input>
                {
                    error && !email && <span className="input-error">Enter valid Email</span>
                }
            </div>
             <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Password" onChange={(e)=>setpassword(e.target.value)}></input>
                {
                    error && !password && <span className="input-error">Enter Valid Password</span>
                }
            </div>
             <div className="input-wrapper">
                <button className="button" onClick={handlesignin}>Sign in</button>
            </div>
            <div className="valid">
                { error && email && password && <span className="input-error">Enter Correct Email and Password</span>}
            </div>
        </div>
        </>
    )
}
export default Usersignin