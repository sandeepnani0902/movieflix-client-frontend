import React, { useState } from "react";
import bannerImage from "../../assets/banner-image-bg.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validations";
import api from "../../api/api";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // Run live validation
    const validationErrors = validateLogin(updatedForm);
    setErrors(validationErrors);
  };

  // When field loses focus
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    setTouched({ username: true, password: true });

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      const payload = {
        email: formData.username, // backend expects 'email'
        password: formData.password,
      };

      const response = await api.post("/login", payload);

      alert(response.data.message);

      // save login data & token (for session use)
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message); // show backend error
      } else {
        alert("Something went wrong, please try again.");
      }
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[450px] bg-black/75 backdrop-blur-sm px-6 py-10 sm:px-12 sm:py-16 rounded-2xl text-white shadow-2xl mx-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center tracking-wide mb-2">
            Sign In
          </h2>

          {/* Email / Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide">
              Email Address
            </label>
            <input
              type="text"
              name="username"
              placeholder="name@example.com"
              autoComplete="email"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl bg-zinc-800 text-white text-sm outline-none border transition-all placeholder-zinc-500
                ${
                  touched.username && errors.username
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-red-500"
                }`}
            />
            {touched.username && errors.username && (
              <span className="text-red-500 text-xs text-right mt-1">
                {errors.username}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl bg-zinc-800 text-white text-sm outline-none border transition-all placeholder-zinc-500
                ${
                  touched.password && errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-red-500"
                }`}
            />
            {touched.password && errors.password && (
              <span className="text-red-500 text-xs text-right mt-1">
                {errors.password}
              </span>
            )}
          </div>

          {/* Options */}
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="w-4 h-4 accent-red-600 rounded bg-zinc-800 border-zinc-700 focus:ring-0 cursor-pointer"
              />
              <span className="text-zinc-300">Show password</span>
            </label>
            <a href="#" className="text-emerald-500 hover:underline font-semibold">
              Forgot Password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-semibold rounded-xl text-lg shadow-lg shadow-red-600/20 cursor-pointer mt-4"
          >
            Sign In
          </button>

          {/* Keep me signed in */}
          <label className="flex items-center justify-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 accent-red-600 rounded bg-zinc-800 border-zinc-700 focus:ring-0 cursor-pointer"
            />
            <span>Keep me signed in</span>
          </label>

          {/* Register Redirect */}
          <div className="text-center text-sm text-zinc-400 mt-2">
            <span>Don't have an account? </span>
            <NavLink
              to="/register"
              className="text-sky-400 hover:text-sky-300 underline font-medium"
            >
              Register Here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
