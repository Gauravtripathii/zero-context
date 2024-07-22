import { connectToDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

connectToDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;

        const user = await User.findOne({ username });
        if (!user)
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        
        const validatePassword = await bcryptjs.compare(password, user.password);
        if (!validatePassword)
            return NextResponse.json(
                { error: "Wrong password" },
                { status: 400 }
            );
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            message: user.message,
        };
        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "24h",
        });

        const response = NextResponse.json({
            message: "Logged in successfully",
            status: 200,
            token,
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
