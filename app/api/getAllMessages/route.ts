import { connectToDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/messages";

connectToDb();

export async function GET(request: NextRequest) {
    try {
        const messages = await Message.find({}, { message: 1, _id: 0 });
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
