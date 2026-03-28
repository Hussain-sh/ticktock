import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timesheets } from "@/app/lib/mockData/timesheets";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(timesheets);
}