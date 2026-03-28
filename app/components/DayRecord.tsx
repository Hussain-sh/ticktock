import { Task } from "../lib/timesheets";
import TaskList from "./TaskList";

export default function DayRecord({
  day,
  tasks,
}: {
  day: string;
  tasks: Task[];
}) {
  return (
    <div className="flex gap-5 flex-col md:flex-row">
      <p className="text-lg font-semibold text-gray-900">{day}</p>
      <TaskList tasks={tasks} />
    </div>
  );
}
