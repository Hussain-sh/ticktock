import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timesheets } from "@/app/lib/mockData/timesheets";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ week: string; taskId: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { week, taskId } = await params;

  console.log("taskId:", taskId, "week:", week);


  const timesheet = timesheets.find((t) => t.week === Number(week));
  if (!timesheet) return NextResponse.json({ error: "Timesheet not found" }, { status: 404 });

  for (const entry of timesheet.entries) {
    const taskIndex = entry.tasks.findIndex((t) => t.id === Number(taskId));
    if (taskIndex !== -1) {
      const [removed] = entry.tasks.splice(taskIndex, 1);
      timesheet.hours -= removed.hours;
      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ error: "Task not found" }, { status: 404 });
}