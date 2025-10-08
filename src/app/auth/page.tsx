"use client"

import { useState } from "react";

export default function AuthPages() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {currentPage === "login" ? (
        <LoginPage onSwitchToRegister={() => setCurrentPage("register")} />
      ) : (
        <RegisterPage onSwitchToLogin={() => setCurrentPage("login")} />
      )}
    </div>
  );
}

function LoginPage({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Login
      </h1>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log("Email input:", e.target.value);
            }}
            placeholder="example@chakra.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DF620C] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log("Password input:", e.target.value);
            }}
            placeholder="************"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DF620C] focus:border-transparent"
          />
        </div>

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        No account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

function RegisterPage({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.log("❌ ERROR: Passwords do not match!");
      alert("Passwords do not match!");
      return;
    }
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Register
      </h1>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DF620C] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@chakra.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DF620C] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="************"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DF620C] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="************"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DF620C] focus:border-transparent"
          />
        </div>

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
