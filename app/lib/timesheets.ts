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

export async function getTimesheets(page: number, limit: number): Promise<TimesheetResponse> {
  const response = await api.get(`/timesheets?page=${page}&limit=${limit}`);
  return response.data;
}