import { connectionStr } from "../../lib/db";
import { ResturantModel } from "../../lib/resturantmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let queryParam = request.nextUrl.searchParams
    let filter={}
    if(queryParam.get("location")){
        let address = queryParam.get("location")
        filter ={address:{$regex: new RegExp(address,'i')}}
    }else if(queryParam.get("resturant")){
        let username = queryParam.get("resturant")
        filter = {username:{$regex: new RegExp(username, 'i')}}
    }
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await ResturantModel.find(filter)
    return NextResponse.json({success:true, result})
}