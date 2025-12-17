import React, { useState } from "react";
import { API } from "./api";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      alert("All fields are required.");
      return;
    }

    const route = isLogin ? "/auth/login" : "/auth/signup";

    try {
      const res = await API.post(route, form);

      alert(res.data.msg);

      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user?.name) localStorage.setItem("username", res.data.user.name);
      if (res.data.user?._id) localStorage.setItem("userId", res.data.user._id);

      window.location.href = isLogin ? "/" : "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">

      <div className="w-full max-w-md p-10 bg-white border border-gray-200 rounded-md shadow-md">

        {/* HEADER */}
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        {/* NAME FIELD (SIGNUP ONLY) */}
        {!isLogin && (
          <input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
        )}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-black"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:border-black"
        />

        {/* LOGIN BUTTON — MYNTRA STYLE */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 font-semibold tracking-wide text-white transition bg-black rounded-md hover:bg-gray-800"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* SWITCH LOGIN/SIGNUP */}
        <p
          className="mt-6 font-medium text-center text-gray-800 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? (
            <>New to L-K ShopSite? <span className="text-pink-600">Create an account</span></>
          ) : (
            <>Already have an account? <span className="text-pink-600">Login</span></>
          )}
        </p>

        {/* FOOTER TEXT (Myntra Style) */}
        <p className="mt-4 text-xs text-center text-gray-500">
          By continuing, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>

    </div>
  );
}
