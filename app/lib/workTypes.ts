import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { workTypes } from "./mockData/workTypes";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(workTypes);
}