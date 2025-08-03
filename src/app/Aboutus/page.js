import Deliveryheader from "../_components/deliveryheader"
import Footer from "../_components/footer"

const page=()=>{
    return(
        <div className="container">
            <Deliveryheader></Deliveryheader>
            <div className="about-us">
            <h1>Zain Ul Abidin</h1>            
            <h2>KhanXada RajPut</h2>
            <p>The Restaurant App is a modern, user-friendly mobile/web application designed to revolutionize the dining experience by making food ordering, table reservations, and restaurant discovery effortless. Whether for dine-in, takeaway, or delivery, the app provides a seamless platform connecting customers with their favorite restaurants.</p>
            <h3>Contact us: zain@gmail.com, 0313131313</h3>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default page