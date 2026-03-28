"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTimesheet, TimesheetDetail } from "@/app/lib/timesheets";
import DayRecord from "@/app/components/DayRecord";
import Footer from "@/app/components/Footer";
import { generateWeekDays } from "@/app/utils/generateWeekDays";

export default function TimesheetDetailPage() {
  const { week } = useParams();
  const weekId = Number(week);
  const weekStr = String(week);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["timesheet", weekId],
    queryFn: () => getTimesheet(weekId),
  });

  const entries =
    data?.entries.length > 0
      ? data.entries
      : generateWeekDays(weekStr).map((day) => ({
          day,
          tasks: [],
        }));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading timesheet.</p>;

  return (
    <section className="container-app px-4 lg:px-0 flex flex-col gap-6 pb-24">
      <div className="w-full flex justify-between">
        <h3 className="text-xl leading-none font-bold md:text-2xl">
          This week &apos;s timesheet
        </h3>
        <p className="text-sm text-gray-500">{data.hours}/ 40 hours</p>
      </div>
      <p className="text-sm font-normal text-gray-500">{data.date}</p>
      {entries.map((entry: TimesheetDetail) => (
        <DayRecord
          key={entry.day}
          day={entry.day}
          tasks={entry.tasks}
          week={weekId}
        />
      ))}
      <Footer />
    </section>
  );
}
