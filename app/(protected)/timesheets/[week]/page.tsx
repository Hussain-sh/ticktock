"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTimesheet, Entry } from "@/app/lib/timesheets";
import DayRecord from "@/app/components/DayRecord";
import Footer from "@/app/components/Footer";
import { generateWeekDays } from "@/app/utils/generateWeekDays";

export default function TimesheetDetailPage() {
  const { week } = useParams();
  const weekId = Number(week);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["timesheet", weekId],
    queryFn: () => getTimesheet(weekId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading timesheet.</p>;
  if (!data) return <p>No data found.</p>;

  const isReadOnly = data.hours >= 40;
  const weekDays = generateWeekDays(data.date);

  const entries = weekDays.map((day) => {
    const existing = data.entries?.find((e: Entry) => e.day === day);
    return existing ?? { day, tasks: [] };
  });

  return (
    <section className="container-app px-4 lg:px-0 flex flex-col gap-6 pb-24">
      <div className="w-full flex justify-between">
        <h3 className="text-xl leading-none font-bold md:text-2xl">
          This week &apos;s timesheet
        </h3>
        <p className="text-sm text-gray-500">{data.hours}/ 40 hours</p>
      </div>
      <p className="text-sm font-normal text-gray-500">{data.date}</p>
      {entries.map((entry: Entry) => (
        <DayRecord
          key={entry.day}
          day={entry.day}
          tasks={entry.tasks}
          week={weekId}
          isReadOnly={isReadOnly}
        />
      ))}
      <Footer />
    </section>
  );
}
