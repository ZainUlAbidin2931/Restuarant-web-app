import { connectionStr } from "../../lib/db";
import { ResturantModel } from "../../lib/resturantmodel"; // ✅ Correct import
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { foodModel } from "../../lib/addfooditem";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });

  const data = await ResturantModel.find(); // ✅ use model, not schema
  console.log(data);

  return NextResponse.json({ result: data });
}

export async function POST(req) {
  try {
    const payload = await req.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result
    let success = false
    if(payload.login){
      result = await ResturantModel.findOne({username:payload.username, password:payload.password})
      if(result){
        success = true
      }
    }
    else{

      const resturant = new ResturantModel(payload); // ✅ use model, not schema
      result = await resturant.save();
      if(result){
        success=true
      }
      
    }
    return NextResponse.json({success, result});
  } catch (error) {
    console.error("Error saving restaurant:", error);
    return NextResponse.json({result: false, error: "Internal Server Error" }, { status: 500 });
  }
}
