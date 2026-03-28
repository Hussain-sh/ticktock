"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTimesheet, TimesheetDetail } from "@/app/lib/timesheets";
import DayRecord from "@/app/components/DayRecord";

export default function TimesheetDetailPage() {
  const { week } = useParams();
  const weekId = Number(week);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["timesheet", weekId],
    queryFn: () => getTimesheet(weekId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading timesheet.</p>;

  return (
    <section className="container-app px-4 lg:px-0 flex flex-col gap-6">
      <div className="w-full flex justify-between">
        <h3 className="text-xl leading-none font-bold md:text-2xl">
          This week &apos;s timesheet
        </h3>
        <p className="text-sm text-gray-500">{data.hours}/ 40 hours</p>
      </div>
      <p className="text-sm font-normal text-gray-500">{data.date}</p>
      {data.entries.map((entry: TimesheetDetail) => (
        <DayRecord
          key={entry.day}
          day={entry.day}
          tasks={entry.tasks}
          week={weekId}
        />
      ))}
    </section>
  );
}
