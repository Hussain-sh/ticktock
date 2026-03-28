import { api } from "@/app/lib/api";

export interface Timesheet {
  week: number;
  date: string;
  hours: number;
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
}

export interface TimesheetDetail extends Timesheet {
  day: string;
  tasks: Task[];
}

export async function getTimesheets(page: number, limit: number): Promise<TimesheetResponse> {
  const response = await api.get(`/timesheets?page=${page}&limit=${limit}`);
  return response.data;
}

export async function getTimesheet(week: number) {
  const response = await api.get(`/timesheets/${week}`);
  return response.data;
}