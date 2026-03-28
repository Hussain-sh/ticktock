import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timesheets } from "@/app/lib/mockData/timesheets";

export async function GET(request: NextRequest) {
console.log("Received request for timesheets");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "5");

  const start = (page - 1) * limit;
  const end = start + limit;
  const data = timesheets.slice(start, end);

  return NextResponse.json({
    data,
    total: timesheets.length,
    page,
    limit,
    totalPages: Math.ceil(timesheets.length / limit),
  });
}