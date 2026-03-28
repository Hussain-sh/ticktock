"use client";
import { useQuery } from "@tanstack/react-query";
import { getTimesheets, Timesheet } from "@/app/lib/timesheets";
import { useState } from "react";
import Badge from "./ui-library/Badge";
import Link from "next/link";

export default function TimesheetTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["timesheets", page, limit],
    queryFn: () => getTimesheets(page, limit),
  });

  const timesheets = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const onPageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const getBadge = (hours: number) => {
    const status =
      hours >= 40 ? "completed" : hours > 0 ? "incomplete" : "missing";

    switch (status) {
      case "completed":
        return (
          <Badge bgColor="bg-green-100" textColor="text-green-800">
            Completed
          </Badge>
        );
      case "incomplete":
        return (
          <Badge bgColor="bg-yellow-100" textColor="text-yellow-800">
            Incomplete
          </Badge>
        );
      case "missing":
        return (
          <Badge bgColor="bg-red-100" textColor="text-red-800">
            Missing
          </Badge>
        );
    }
  };

  const getActionText = (hours: number) => {
    const status =
      hours >= 40 ? "completed" : hours > 0 ? "incomplete" : "missing";

    switch (status) {
      case "completed":
        return "View";
      case "incomplete":
        return "Update";
      case "missing":
        return "Create";
    }
  };

  const steps = [5, 10, 20];
  const total = data?.total ?? 0;
  const perPageOptions = [...steps.filter((n) => n < total), total];

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-96">
        <p>Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center w-full h-96">
        <p>Error loading timesheets.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Week #
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((row: Timesheet) => (
              <tr
                key={row.week}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4 text-gray-800 font-medium">
                  {row.week}
                </td>
                <td className="px-5 py-4 text-gray-700">{row.date}</td>
                <td className="px-5 py-4">{getBadge(row.hours)}</td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/timesheets/${row.week}`}
                    className="text-blue-500 font-medium cursor-pointer"
                  >
                    {getActionText(row.hours)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap flex-col gap-2 md:flex-row items-center justify-between">
        <select
          value={limit}
          onChange={onPageSizeChange}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md"
        >
          {perPageOptions.map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 text-sm rounded-md border cursor-pointer ${
                page === p
                  ? "bg-secondary-strong text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border cursor-pointer border-gray-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
