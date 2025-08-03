import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const C_header=(props)=>{
    const [cartno, setcartno]= useState(0)
    const [cartitem, setcartitem] = useState()
    const [detail, setdetail]= useState()
    const [isloaded, setisloaded]=useState(false)
    const pathname= usePathname()
    const router= useRouter()
    useEffect(()=>{
        setisloaded(true)
    },[])
    useEffect(()=>{
        const cartstorage= JSON.parse(localStorage.getItem('cart'));
        if(cartstorage){
            setcartno(cartstorage?.length)
            setcartitem(cartstorage)
        }
    },[])
    useEffect(()=>{
        if(props.removecartitem){
            setcartitem([])
            setcartno(0)
            localStorage.removeItem('cart')
        }
    },[props.removecartitem])
    useEffect(()=>{
        if(cartno==0 && pathname=="/ordernow"){
            router.push('')
        }
    },[cartno])
    const handlelogout=()=>{
        localStorage.removeItem('user')
        router.push('/user-auth')
    }
    const handlelogin=()=>{
        router.push('/user-auth')
    }
    useEffect(()=>{
        let data=localStorage.getItem('user')
        setdetail(data)
        if(data && pathname=="/user-auth"){
            router.push('/')
        }
    const profile = JSON.parse(data)
    setdetail(data)
    },[])
    useEffect(()=>{
        if(props.cartData){
            if(cartno){
                if(props.cartData.resto_id!=cartitem[0].resto_id){
                    localStorage.removeItem('cart')
                    setcartno(1)
                    setcartitem([props.cartData])
                    localStorage.setItem("cart", JSON.stringify([props.cartData]))
                }else{
                    let localcartitem = cartitem
                    localcartitem.push(JSON.parse(JSON.stringify(props.cartData)))
                    setcartitem(localcartitem)
                    setcartno(cartno+1)
                    localStorage.setItem('cart',JSON.stringify(localcartitem))
                }
            }else{
                setcartno(1)
                setcartitem([props.cartData])
                localStorage.setItem("cart", JSON.stringify([props.cartData]))
            }
            
        }

    },[props.cartData])
    useEffect(()=>{
        if(props.removeData){
            let localcartitem= cartitem.filter((item)=>{
                return item._id!=props.removeData
            })
            setcartitem(localcartitem)
            setcartno(cartno-1)
            localStorage.setItem('cart', JSON.stringify(localcartitem))
            if(localcartitem.length==0){
                localStorage.removeItem('cart')
            }
        }
    },[props.removeData])
    return(
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width:100}} src="https://i.pinimg.com/736x/a7/36/c8/a736c8a0a5af369df75038a40beb7151.jpg"></img>
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                    {
                        detail?(<><li><Link href="/userprofile">{JSON.parse(detail).username}</Link></li><li><button onClick={handlelogout}>Log out</button></li></>):<li><button onClick={handlelogin}>Login</button></li>
                    }
                <li>
                    <Link href={cartno?'/cart':"#"}>Cart({cartno?cartno:0})</Link>
                </li>
                <li>
                    <Link href="/resturant">Add Resturant</Link>
                </li>
                <li>
                    <Link href="/deliverpartner">Add Deilivery Partner</Link>
                </li>
                <li>
                    <Link href="/Aboutus">About us</Link>
                </li>
            </ul>
        </div>
    )
}
export default C_header;