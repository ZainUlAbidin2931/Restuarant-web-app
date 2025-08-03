import { foodModel } from "../../../lib/addfooditem"
import { NextResponse } from "next/server"

const { connectionStr } = require("../../lib/db")
const { default: mongoose } = require("mongoose")

export async function POST(req){
    try{

        const payload = await req.json()
        let success =false
        await mongoose.connect(connectionStr,{useNewUrlParser: true})
        const food = new foodModel(payload);
        const result = await food.save();
        if(result){
            success = true;
        }
         return NextResponse.json({success, result})
    }
    catch(error){
         console.error("Error saving restaurant:", error);
        return NextResponse.json({result: false, error: "Internal Server Error" }, { status: 500 });
    }
   
}

