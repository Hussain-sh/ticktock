"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../lib/timesheets";
import { api } from "../lib/api";

interface Props {
  week: number;
  day: string;
  onClose: () => void;
}

interface TaskFormValues {
  projectId: number | "";
  workTypeId: number | "";
  taskDescription: string;
  hours: number;
}

const validationSchema = Yup.object({
  projectId: Yup.number().required("Project is required"),
  workTypeId: Yup.number().required("Type of work is required"),
  taskDescription: Yup.string()
    .required("Description is required")
    .min(5, "Too short"),
  hours: Yup.number()
    .required("Hours is required")
    .min(1, "Minimum 1h")
    .max(8, "Maximum 8h"),
});

export default function AddTaskModal({ week, day, onClose }: Props) {
  const queryClient = useQueryClient();

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await api.get("/projects")).data,
  });

  const { data: workTypes = [] } = useQuery({
    queryKey: ["workTypes"],
    queryFn: async () => (await api.get("/work-types")).data,
  });

  const mutation = useMutation({
    mutationFn: (values: TaskFormValues) => addTask(week, { ...values, day }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timesheet", week],
        exact: true,
      });
      onClose();
    },
  });

  const formik = useFormik<TaskFormValues>({
    initialValues: {
      projectId: "",
      workTypeId: "",
      taskDescription: "",
      hours: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const incrementHours = () => {
    if (formik.values.hours < 8) {
      formik.setFieldValue("hours", formik.values.hours + 1);
    }
  };

  const decrementHours = () => {
    if (formik.values.hours > 1) {
      formik.setFieldValue("hours", formik.values.hours - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Project</label>
            <select
              name="projectId"
              value={formik.values.projectId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="">Select project</option>
              {projects.map((p: { id: number; name: string }) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {formik.touched.projectId && formik.errors.projectId && (
              <p className="text-xs text-red-500">{formik.errors.projectId}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Type of Work
            </label>
            <select
              name="workTypeId"
              value={formik.values.workTypeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="">Select type</option>
              {workTypes.map((w: { id: number; name: string }) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
            {formik.touched.workTypeId && formik.errors.workTypeId && (
              <p className="text-xs text-red-500">{formik.errors.workTypeId}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Task Description
            </label>
            <textarea
              name="taskDescription"
              value={formik.values.taskDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              placeholder="Describe the task..."
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
            />
            {formik.touched.taskDescription &&
              formik.errors.taskDescription && (
                <p className="text-xs text-red-500">
                  {formik.errors.taskDescription}
                </p>
              )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Hours</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decrementHours}
                disabled={formik.values.hours <= 1}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <span className="w-8 text-center text-sm font-medium text-gray-900">
                {formik.values.hours}
              </span>

              <button
                type="button"
                onClick={incrementHours}
                disabled={formik.values.hours >= 8}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
              </button>
            </div>
            {formik.touched.hours && formik.errors.hours && (
              <p className="text-xs text-red-500">{formik.errors.hours}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {mutation.isPending ? "Saving..." : "Add Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
