import { connectToDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Message from "@/models/messages";

connectToDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { message } = reqBody;
        const id = getDataFromToken(request);

        const user = await User.findById(id);
        user.message = message;
        await user.save();

        const messages = await Message.create({ message, user: id });
        await messages.save();

        return NextResponse.json({ user }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
