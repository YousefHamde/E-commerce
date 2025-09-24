import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service_id: "service_mcv9ltl",
              template_id: "template_f4p6fyo",
              user_id: "jMXINHJ-rqn6iKPfd",
              template_params: {
                from_name: values.name,
                from_email: values.email,
                message: values.message,
              },
            }),
          }
        );

        if (response.ok) {
          alert("Message sent successfully!");
          resetForm();
        } else {
          alert("Failed to send message. Try again.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Something went wrong!");
      }
    },
  });

  return (
    <>
      <Header />
      
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Write your message..."
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                {...formik.getFieldProps("message")}
              />
              {formik.touched.message && formik.errors.message ? (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.message}
                </p>
              ) : null}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-blue-600 px-4 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
