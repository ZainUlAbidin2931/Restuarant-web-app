import { connectionStr } from "../../lib/db"
import { usersignupmodel } from "../../lib/usersignup"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    let payload = await request.json()
    let success= false
    let result
    await mongoose.connect(connectionStr,{useNewUrlParser: true})
    if(payload.login){
        result= await usersignupmodel.findOne({email:payload.email,password:payload.password })
        if(result){
            success = true
        }
    }else{
    const user = new usersignupmodel(payload)
    result = await user.save()
    if(result){
        success=true
    }
}
    return NextResponse.json({success, result})
}
export async function GET() {
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let data = await usersignupmodel.find()
    let success=false
    if(data){
        success=true
    }
    return NextResponse.json({success, result:data})
}