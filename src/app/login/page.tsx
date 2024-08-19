"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter(); // Initialize router

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", formData)
      .then(async (response) => {
        alert("Login successful!");
        const username = response.data.user.name;
        const address = response.data.user.address;
        localStorage.setItem("username", username.toString());
        localStorage.setItem("address", address.toString());
      })
      .catch((err) => {
        setError("Incorrect email/password");
      });
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form className="flex flex-col mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block text-black bg-slate-50 w-full px-3 py-2 mt-1 border  rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="relative block bg-slate-50  text-black w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-center mt-4">{error}</div>
          )}

          <button type="submit" className="bg-blue-500 py-3 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
