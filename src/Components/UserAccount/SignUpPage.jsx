import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../../Css/startUp.css";
export const SignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const validate = () => {
    const errs = {};
    const trimmedEmail = form.email.trim().toLowerCase();

    if (!form.name.trim()) errs.name = "Name is required";

    if (!trimmedEmail) errs.email = "Email is required";
    else if (!emailRegex.test(trimmedEmail))
      errs.email = "Invalid email address";

    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Min 6 characters";

    if (!form.confirm) errs.confirm = "Please confirm your password";
    else if (form.confirm !== form.password)
      errs.confirm = "Passwords don't match";

    if (!form.agree) errs.agree = "You must agree to the terms";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  const inputClass = (name) =>
    `w-full border rounded-full px-5 py-3.5 font-satoshi text-sm outline-none transition-all 
    ${errors[name] ? "border-red-400 bg-red-50" : "border-black/10 focus:border-black bg-[#F0F0F0] focus:bg-white"}`;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-white startUp">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-integral text-3xl md:text-4xl mb-2">
            Create Account
          </h1>
          <p className="text-black/50 font-satoshi">
            Join us and start shopping
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="font-satoshi font-medium text-sm">
              Full Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className={inputClass("name")}
            />

            {errors.name && (
              <p className="text-red-400 text-xs font-satoshi pl-2">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="font-satoshi font-medium text-sm">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs font-satoshi pl-2">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="font-satoshi font-medium text-sm">Password</label>
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
                  <FaEyeSlash className="cursor-pointer" size={18} />
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="font-satoshi font-medium text-sm">
              Confirm Password
            </label>
            <div className="relative group">
              <input
                type={showRepeatPassword ? "text" : "password"}
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder={
                  showRepeatPassword ? "Enter password" : "•••••••••••"
                }
                className={`w-full border rounded-full px-5 py-3.5 font-satoshi text-sm outline-none transition-all
                ${errors.confirm ? "border-red-400 bg-red-50" : "border-black/10 focus:border-black bg-[#F0F0F0] focus:bg-white"}`}
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors cursor-pointer"
              >
                {showRepeatPassword ? (
                  <FaEyeSlash className="cursor-pointer" size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {errors.confirm && (
              <p className="text-red-400 text-xs font-satoshi pl-2">
                {errors.confirm}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="mt-0.5 w-4 h-4 accent-black cursor-pointer"
              />
              <span className="font-satoshi text-sm text-black/60">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-black underline hover:no-underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-black underline hover:no-underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agree && (
              <p className="text-red-400 text-xs font-satoshi pl-7">
                {errors.agree}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-full py-4 font-satoshi font-medium hover:bg-black/80 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-black/40 font-satoshi text-sm">or</span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        <button className="w-full border border-black/10 rounded-full py-3.5 font-satoshi font-medium text-sm flex items-center justify-center gap-3 hover:bg-[#F0F0F0] transition-all cursor-pointer">
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center mt-6 font-satoshi text-sm text-black/50">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};
