'use client'
import { useEffect , useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const Header=()=>{
    const [details, setdetails]= useState();
    const router = useRouter();
    const pathname = usePathname();
    const handlelogout=()=>{
        localStorage.removeItem("resturantuser");
        router.push("/resturant")
    }
    useEffect(()=>{
        let data = localStorage.getItem("resturantuser");
        if(!data){
            router.push("/resturant");
        }
        else if(data && pathname=="/resturant"){
            router.push("/resturant/dashboard");
        }
        else{
            setdetails(JSON.parse(data))
        }
    },[])
    return(
        <>
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width:100}} src="https://i.pinimg.com/736x/a7/36/c8/a736c8a0a5af369df75038a40beb7151.jpg"></img>
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">
                    { details?<><button onClick={handlelogout}>Log Out</button></>:<>Log In</>}
                    </Link></li>
                <li><Link href="/">About Us</Link></li>
            </ul>
        </div>
        </>
    )
}
export default Header;