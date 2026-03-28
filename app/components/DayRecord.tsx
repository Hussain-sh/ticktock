"use client";
import { useState } from "react";
import { Task } from "../lib/timesheets";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModel";

export default function DayRecord({
  day,
  tasks,
  week,
}: {
  day: string;
  tasks: Task[];
  week: number;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex gap-5 flex-col md:flex-row">
      <p className="text-lg font-semibold text-gray-900">{day}</p>
      <TaskList
        week={week}
        tasks={tasks}
        onAddTask={() => setShowModal(true)}
      />
      {showModal && (
        <AddTaskModal
          week={week}
          day={day}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
