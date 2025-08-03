import { foodModel } from "../../../../lib/addfooditem";
import { connectionStr } from "../../../../lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, content) {
    const { id } = await content.params
    let success = false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const result = await foodModel.find({ resto_id: new mongoose.Types.ObjectId(id) });

    if(result){
        success=true
    }
    return NextResponse.json({result, success})    
}

export async function DELETE(request, content){
    const { id } =await content.params
    let success =false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const result = await foodModel.deleteOne({_id:id})
    if(result.deletedCount>0){
        success = true
    }
    return NextResponse.json({result, success})

}
