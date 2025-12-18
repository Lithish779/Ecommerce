import React, { useState } from "react";
import { API } from "./api";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // signup/reset steps
  const [otp, setOtp] = useState("");
  const [forgot, setForgot] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "", // email
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async () => {
    if (!form.contact || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: form.contact,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  /* ---------------- SIGNUP : SEND OTP ---------------- */
  const sendSignupOtp = async () => {
    if (!form.name || !form.contact || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/auth/signup/send-otp", {
        contact: form.contact,
      });

      setStep(2);
      alert("OTP sent");
    } catch (err) {
      alert(err.response?.data?.msg || "OTP failed");
    }
  };

  /* ---------------- SIGNUP : VERIFY OTP ---------------- */
  const verifySignupOtp = async () => {
    try {
      await API.post("/auth/signup/verify-otp", {
        name: form.name,
        contact: form.contact,
        password: form.password,
        otp,
      });

      alert("Signup successful. Please login.");
      setIsLogin(true);
      setStep(1);
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  /* ---------------- FORGOT PASSWORD : SEND OTP ---------------- */
  const sendResetOtp = async () => {
    if (!form.contact) {
      alert("Email required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/send-otp", {
        email: form.contact,
      });

      setStep(2);
      alert("OTP sent to email");
    } catch (err) {
      alert(err.response?.data?.msg || "OTP failed");
    }
  };

  /* ---------------- RESET PASSWORD ---------------- */
  const resetPassword = async () => {
    if (!otp || !form.newPassword) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/verify-otp", {
        email: form.contact,
        otp,
        newPassword: form.newPassword,
      });

      alert("Password reset successful");
      setForgot(false);
      setStep(1);
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="w-full max-w-md p-10 bg-white border rounded-md shadow-md">

        <h1 className="mb-6 text-2xl font-bold">
          {forgot
            ? "Reset Password"
            : isLogin
            ? "Login"
            : "Create Account"}
        </h1>

        {/* ================= LOGIN ================= */}
        {isLogin && !forgot && (
          <>
            <input
              name="contact"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded"
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 text-white bg-black rounded"
            >
              Login
            </button>

            <p
              className="mt-4 text-sm text-center text-pink-600 cursor-pointer"
              onClick={() => {
                setForgot(true);
                setStep(1);
              }}
            >
              Forgot password?
            </p>
          </>
        )}

        {/* ================= SIGNUP ================= */}
        {!isLogin && !forgot && step === 1 && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded"
            />

            <input
              name="contact"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded"
            />

            <input
              name="password"
              type="password"
              placeholder="Create Password"
              onChange={handleChange}
              className="w-full p-3 mb-6 border rounded"
            />

            <button
              onClick={sendSignupOtp}
              className="w-full py-3 text-white bg-black rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {!isLogin && !forgot && step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-6 border rounded"
            />

            <button
              onClick={verifySignupOtp}
              className="w-full py-3 text-white bg-black rounded"
            >
              Verify & Create Account
            </button>
          </>
        )}

        {/* ================= RESET PASSWORD ================= */}
        {forgot && step === 1 && (
          <>
            <input
              name="contact"
              placeholder="Registered Email"
              onChange={handleChange}
              className="w-full p-3 mb-6 border rounded"
            />

            <button
              onClick={sendResetOtp}
              className="w-full py-3 text-white bg-black rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {forgot && step === 2 && (
          <>
            <input
              placeholder="OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-4 border rounded"
            />

            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              onChange={handleChange}
              className="w-full p-3 mb-6 border rounded"
            />

            <button
              onClick={resetPassword}
              className="w-full py-3 text-white bg-black rounded"
            >
              Reset Password
            </button>
          </>
        )}

        {/* ================= SWITCH ================= */}
        <p
          className="mt-6 text-center cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
            setForgot(false);
            setStep(1);
          }}
        >
          {isLogin ? (
            <>New to L-K ShopSite? <span className="text-pink-600">Create account</span></>
          ) : (
            <>Already have an account? <span className="text-pink-600">Login</span></>
          )}
        </p>

        <p className="mt-4 text-xs text-center text-gray-500">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}