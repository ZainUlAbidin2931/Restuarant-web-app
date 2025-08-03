import { connectionStr } from "../../../../lib/db"
import { orderModel } from "../../../../lib/order"
import { ResturantModel } from "../../../../lib/resturantmodel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"


export async function GET(request, content) {
    const {id}= content.params
    let success= false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await orderModel.find({deliveryboyid: id})
    if(result){
        let restoData= await Promise.all(
            result.map(async(items)=>{
                let restoinfo={}
                restoinfo.data= await ResturantModel.findOne({_id: items.resto_id})
                restoinfo.amount= items.amount
                restoinfo.status= items.status
                return restoinfo
            })
        )
        result=restoData
        success=true
    }
    return NextResponse.json({result, success})
}