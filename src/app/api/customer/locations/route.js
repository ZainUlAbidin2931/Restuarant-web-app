import { connectionStr } from "../../../lib/db";
import { ResturantModel } from "../../../lib/resturantmodel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await ResturantModel.find();
    result = result.map(item=>item.city.charAt(0).toUpperCase()+item.city.slice(1));
    result = [...new Set(result)]
    return NextResponse.json({success:true, result})
}
