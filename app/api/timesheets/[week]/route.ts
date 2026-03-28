import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timesheets } from "@/app/lib/mockData/timesheets";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ week: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { week } = await params;
  const timesheet = timesheets.find((t) => t.week === Number(week));

  if (!timesheet) {
    return NextResponse.json({ error: "Timesheet not found" }, { status: 404 });
  }

  return NextResponse.json(timesheet);
}