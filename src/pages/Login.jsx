import React, { useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex flex-1 items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome to Fashion Hup
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div className="my-5">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  autoComplete="username"
                  className="form-input block w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                  id="username"
                  name="username"
                  placeholder="username"
                  type="text"
                  {...formik.getFieldProps("username")}
                />
              </div>
              {formik.touched.username && formik.errors.username ? (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.username}
                </p>
              ) : null}
            </div>

            {/* Password */}
            <div className="my-5">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  autoComplete="current-password"
                  className="form-input block w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            {/* Button */}
            <div className="my-5">
              <button
                className="flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-lg font-bold shadow-md bg-[var(--primary-color)] text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
