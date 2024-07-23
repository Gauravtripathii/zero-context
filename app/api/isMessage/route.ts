import { connectToDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connectToDb();

export async function GET(request: NextRequest) {
    try {
        const id = getDataFromToken(request);
        const user = await User.findById(id);
        const { message } = user;
        if (message)
            return NextResponse.json({ message: user.message }, { status: 200 });
        return NextResponse.json({ message: "" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


