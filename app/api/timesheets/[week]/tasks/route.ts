import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timesheets } from "@/app/lib/mockData/timesheets";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ week: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { week } = await params;
  const body = await request.json();

  const timesheet = timesheets.find((t) => t.week === Number(week));
  if (!timesheet) return NextResponse.json({ error: "Timesheet not found" }, { status: 404 });

  const entry = timesheet.entries.find((e) => e.day === body.day);
  if (!entry) return NextResponse.json({ error: "Day not found" }, { status: 404 });

  const newTask = {
    id: Date.now(),
    taskName: body.taskName,
    taskDescription: body.taskDescription,
    hours: body.hours,
    projectId: body.projectId,
    workTypeId: body.workTypeId,
  };

  entry.tasks.push(newTask);
  timesheet.hours += newTask.hours;

  return NextResponse.json(newTask, { status: 201 });
}