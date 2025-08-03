import { foodModel } from "../../../lib/addfooditem";
import { connectionStr } from "../../../lib/db";
import { ResturantModel } from "../../../lib/resturantmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const { id }= await content.params;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let resto_detail= await ResturantModel.findOne({_id:id})
    let fooditems= await foodModel.find({resto_id:id})
    return NextResponse.json({success:true,resto_detail, fooditems})
    
}