import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useClickOutside } from "../hooks/useClickOutside";
import { deleteTask, Task } from "../lib/timesheets";
import Badge from "./ui-library/Badge";
import { useState } from "react";

function TaskMenu({ week, taskId }: { week: number; taskId: number }) {
  const [open, setOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(week, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timesheet", week] });
    },
  });

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          {/* <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Edit
          </button> */}
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function TaskList({
  week,
  tasks,
  onAddTask,
}: {
  week: number;
  tasks: Task[];
  onAddTask: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex bg-white rounded-lg shadow-sm justify-between items-start px-2.5 py-3"
        >
          <h4 className="text-base font-medium text-gray-900">
            {task.taskName}
          </h4>
          <div className="flex gap-2 items-center">
            <p className="leading-none text-sm font-normal text-gray-400">
              {task.hours} hrs
            </p>
            <Badge bgColor="bg-blue-100" textColor="text-blue-800">
              {task.projectName}
            </Badge>
            <TaskMenu week={week} taskId={task.id} />
          </div>
        </div>
      ))}

      <button
        onClick={onAddTask}
        className="w-full flex cursor-pointer items-center justify-center gap-2 px-2.5 py-3 bg-white border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-800 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add new task
      </button>
    </div>
  );
}
