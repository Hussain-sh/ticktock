import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timesheets } from "@/app/lib/mockData/timesheets";
import { projects } from "@/app/lib/mockData/projects";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ week: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { week } = await params;
  const timesheet = timesheets.find((t) => t.week === Number(week));

  const enriched = {
  ...timesheet,
  entries: timesheet?.entries.map((entry) => ({
    ...entry,
    tasks: entry.tasks.map((task) => ({
      ...task,
      projectName: projects.find((p) => p.id === task.projectId)?.name ?? "-",
    })),
  })),
};

  if (!timesheet) {
    return NextResponse.json({ error: "Timesheet not found" }, { status: 404 });
  }

  return NextResponse.json(enriched);
}