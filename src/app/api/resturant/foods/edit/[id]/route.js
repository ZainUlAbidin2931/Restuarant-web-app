import { foodModel } from "../../../../../lib/addfooditem"
import { connectionStr } from "../../../../../lib/db"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, content){
    const {id} = await content.params
    let success = false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const result = await foodModel.findOne({_id:id})
    if(result){
        success=true
    }
    return NextResponse.json({result, success})
}

export async function PUT(request, content){
    const payload = await request.json()
    const {id}= await content.params
    let success= false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await foodModel.findOneAndUpdate({_id:id},payload)
    if(result){
        success = true
    }
    return NextResponse.json({success, result})
}

