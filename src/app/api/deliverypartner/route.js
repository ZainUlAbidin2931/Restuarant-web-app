import { connectionStr } from "../../lib/db"
import { deliverypartnermodel } from "../../lib/deliverypartner"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    let payload= await request.json()
    await mongoose.connect(connectionStr,{useNewUrlParser: true})
    let success= false
    let result
    if(payload.login){
        result = await deliverypartnermodel.findOne({username: payload.username, password: payload.password})
        if(result){
            success= true
        }
    }else{
        let partnerdata = new deliverypartnermodel(payload)
        result = await partnerdata.save()
        if(result){
            success=true
        }
    }
    return NextResponse.json({result, success})
}