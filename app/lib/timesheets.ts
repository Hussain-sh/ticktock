import { api } from "@/app/lib/api";
import { getStoredTimesheets, setStoredTimesheets } from "../utils/storage";
import { projects } from "./mockData/projects";
import { workTypes } from "./mockData/workTypes";


export interface Timesheet {
  week: number;
  date: string;
  hours: number;
  entries: Entry[];
}

export interface TimesheetResponse {
  data: Timesheet[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Task {
  id: number;
  projectName: string;
  taskName: string;
  taskDescription: string;
  hours: number;
  projectId: number;
  workTypeId: number;
}

export interface Entry {
  day: string;
  tasks: Task[];
}

export interface TimesheetDetail extends Entry {
  week: number;
}

export async function getTimesheets(): Promise<Timesheet[]> {
  const stored = getStoredTimesheets();
  if (stored) return stored;
  const response = await api.get("/timesheets");
   const enriched = response.data.map((timesheet: Timesheet) => ({
    ...timesheet,
    entries: timesheet.entries.map((entry: Entry) => ({
      ...entry,
      tasks: entry.tasks?.map((task: Task) => ({
        ...task,
        projectName: projects.find((p) => p.id === task.projectId)?.name ?? "-",
        taskName: workTypes.find((w) => w.id === task.workTypeId)?.name ?? "-",
      })),
    })),
  }));

  setStoredTimesheets(enriched);
  return enriched;
}

export async function getTimesheet(week: number): Promise<Timesheet | undefined> {
  const timesheets = await getTimesheets();
  return timesheets.find((t: Timesheet) => t.week === week);
}

export function addTaskToStorage(
  week: number,
  day: string,
  task: Omit<Task, "id">
): Task {
  const timesheets = getStoredTimesheets();

  const timesheet = timesheets.find((t: Timesheet) => t.week === week);

  let entry = timesheet.entries.find((e: Entry) => e.day === day);
  if (!entry) {
    entry = { day, tasks: [] };
    timesheet.entries.push(entry);
  }

  const newTask: Task = { id: Date.now(), ...task };
  entry.tasks.push(newTask);
  timesheet.hours += newTask.hours;

  setStoredTimesheets(timesheets);
  return newTask;
}

export function updateTaskInStorage(week: number, updatedTask: Task): void {
  const timesheets = getStoredTimesheets();
  const timesheet = timesheets.find((t: Timesheet) => t.week === week);

  for (const entry of timesheet.entries) {
    const index = entry.tasks.findIndex((t: Task) => t.id === updatedTask.id);
    if (index !== -1) {
      const oldHours = entry.tasks[index].hours;
      entry.tasks[index] = updatedTask;
      timesheet.hours = timesheet.hours - oldHours + updatedTask.hours;
      break;
    }
  }

  setStoredTimesheets(timesheets);
}

export function deleteTaskFromStorage(week: number, taskId: number): void {
  const timesheets = getStoredTimesheets();

  const timesheet = timesheets.find((t: Timesheet) => t.week === week);

  for (const entry of timesheet.entries) {
    const index = entry.tasks.findIndex((t: Task) => t.id === taskId);
    if (index !== -1) {
      const [removed] = entry.tasks.splice(index, 1);
      timesheet.hours -= removed.hours;
      break;
    }
  }

  setStoredTimesheets(timesheets);
}