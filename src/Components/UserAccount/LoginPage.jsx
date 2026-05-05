import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../../Css/LoginPage.css";
import "../../Css/startUp.css";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const validate = () => {
    const newErrors = {};
    const trimmedEmail = form.email.trim().toLowerCase();

    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!emailRegex.test(trimmedEmail))
      newErrors.email = "Invalid email address";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Min 6 characters";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);

    const trimmedEmail = form.email.trim().toLowerCase();
    console.log("Login with:", trimmedEmail);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-white startUp">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-integral text-3xl md:text-4xl mb-2">
            Welcome Back
          </h1>
          <p className="text-black/50 font-satoshi">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="font-satoshi font-medium text-sm">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              style={{ caretColor: "black" }}
              className={`w-full border rounded-full px-5 py-3.5 font-satoshi text-sm outline-none transition-all 
                ${errors.email ? "border-red-400 bg-red-50" : "border-black/10 focus:border-black bg-[#F0F0F0] focus:bg-white "}`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs font-satoshi pl-2">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-satoshi font-medium text-sm">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-satoshi text-black/50 hover:text-black transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={showPassword ? "Enter password" : "•••••••••••"}
                className={`w-full border rounded-full px-5 py-3.5 font-satoshi text-sm outline-none transition-all
                ${errors.password ? "border-red-400 bg-red-50" : "border-black/10 focus:border-black bg-[#F0F0F0] focus:bg-white"}`}
              />
              <button
                type="button" // Important: prevents form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash size={18} className="cursor-pointer" />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs font-satoshi pl-2">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-full py-4 font-satoshi font-medium hover:bg-black/80 active:scale-95 transition-all disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-black/40 font-satoshi text-sm">or</span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        {/* Google */}
        <button className="w-full border border-black/10 rounded-full py-3.5 font-satoshi font-medium text-sm flex items-center justify-center gap-3 hover:bg-[#F0F0F0] transition-all cursor-pointer">
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center mt-6 font-satoshi text-sm text-black/50">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};
