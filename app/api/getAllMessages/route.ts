import { connectToDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connectToDb();

export async function GET(request: NextRequest) {
}
