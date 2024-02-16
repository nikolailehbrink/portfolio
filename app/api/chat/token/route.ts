import { NextResponse } from "next/server";
import { tokens } from "../route";

export async function GET() {
  return NextResponse.json(tokens);
}
