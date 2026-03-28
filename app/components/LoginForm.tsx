"use client";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { api } from "../lib/api";

interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (values: LoginPayload) => api.post("/login", values),
    onSuccess: () => {
      router.push("/timesheets");
    },
    onError: () => {
      formik.setStatus("Invalid credentials");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        await loginMutation.mutateAsync(values);
        router.push("/timesheets");
      } catch (err) {
        setStatus("Invalid credentials");
        console.error("Login error:", err);
      }
    },
  });
  return (
    <div className="w-full max-w-md flex flex-col gap-5">
      <h1 className="text-xl leading-tight font-bold text-gray-900">
        Welcome Back
      </h1>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="name@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            checked={formik.values.remember}
            onChange={formik.handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            Remember me
          </label>
        </div>

        {formik.status && (
          <p className="text-red-500 text-sm">{formik.status}</p>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting || loginMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
