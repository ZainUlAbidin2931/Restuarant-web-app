import { connectionStr } from "../../../lib/db";
import { deliverypartnermodel } from "../../../lib/deliverypartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    let {city} = await content.params;
    let success= false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let filter ={city:{$regex: new RegExp(city, 'i')}}
    const result= await deliverypartnermodel.find(filter)
    if(result){
        success=true
    }
    return NextResponse.json({result, success})
}