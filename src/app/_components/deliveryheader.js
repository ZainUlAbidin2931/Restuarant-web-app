import Link from "next/link"
const Deliveryheader=()=>{
    return(
        <>
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width:100}} src="https://i.pinimg.com/736x/a7/36/c8/a736c8a0a5af369df75038a40beb7151.jpg"></img>
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
            </ul>
        </div>
        </>
    )
}
export default Deliveryheader