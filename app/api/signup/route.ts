import { connectToDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const response = NextResponse.json({
      message: "New user saved successfully!",
      status: 200,
      savedUser,
    });

    // create token data
    const tokenData = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      message: savedUser.message,
    };
    // create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "24h",
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: `There was an error : ${error.message}`,
      status: 500,
    });
  }
}
