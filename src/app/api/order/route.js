import { connectionStr } from "../../lib/db"
import { orderModel } from "../../lib/order"
import { ResturantModel } from "../../lib/resturantmodel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    let payload = await req.json()
    let success =false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let order = new orderModel(payload)
    const result = await order.save()
    if(result){
        success=true
    }
    return NextResponse.json({result, success})
}
export async function GET(request) {
    const userId= request.nextUrl.searchParams.get('id')
    let success= false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await orderModel.find({user_id:userId})
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