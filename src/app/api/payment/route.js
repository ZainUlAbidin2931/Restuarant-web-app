import { connectionStr } from "../../lib/db";
import { paymentmodel } from "../../lib/payment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    let payload= req.json()
    let success= false
    await mongoose.connect(connectionStr, {useNewUrlParser:true})
    let payment = new paymentmodel(payload)
    let result = payment.save()
    if(result){
        success=true
    }
    
    return NextResponse.json({success, result})
}