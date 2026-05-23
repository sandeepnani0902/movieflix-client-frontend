import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { validateField } from "../../utils/validations";
import api from "../../api/api";
import bannerImage from "../../assets/banner-image-bg.jpg";
import cameraIcon from "../../assets/icons/camera-icon.svg";

function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    profile: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState({});
  const [focused, setFocused] = useState("");

  const navigate = useNavigate();
  const profileRef = useRef();

  // Handle input + live validation
  function handleInput(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const msg = validateField(name, value, { ...form, [name]: value });
    setError((prev) => ({ ...prev, [name]: msg }));
  }

  // Focus and blur effects
  function handleFocus(name) {
    setFocused(name);
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const msg = validateField(name, value, form);
    setError((prev) => ({ ...prev, [name]: msg }));
    setFocused("");
  }

  // Handle profile upload
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setForm((prev) => ({ ...prev, profile: file }));
      setError((prev) => ({ ...prev, profile: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        profile: "Please upload a profile picture",
      }));
    }
  }

  async function handleForm(e) {
    e.preventDefault();

    let isValid = true;

    // Frontend validation
    Object.keys(form).forEach((field) => {
      if (field !== "profile") {
        const msg = validateField(field, form[field], form);
        if (msg) {
          isValid = false;
        }
      }
    });

    if (!form.profile) {
      isValid = false;
      setError((prev) => ({
        ...prev,
        profile: "Please upload a profile picture",
      }));
    }

    if (!isValid) {
      alert("Form is incomplete — please check again.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstname", form.firstname);
      formDataToSend.append("lastname", form.lastname);
      formDataToSend.append("email", form.email);
      formDataToSend.append("mobile", form.mobile);
      formDataToSend.append("password", form.password);
      formDataToSend.append("confirmpassword", form.confirmpassword);
      formDataToSend.append("profile", form.profile);

      const response = await api.post("/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-[550px] bg-black/75 backdrop-blur-sm px-6 py-8 sm:px-12 sm:py-12 rounded-2xl text-white shadow-2xl">
        <form onSubmit={handleForm} className="flex flex-col gap-5 w-full">
          <h2 className="text-3xl font-bold text-center tracking-wide mb-2">
            Create Account
          </h2>

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div
              className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-red-500 transition-colors"
              onClick={() => profileRef.current.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={cameraIcon} alt="Upload" className="w-10 h-10 opacity-70" />
              )}
            </div>
            {error.profile && (
              <p className="text-red-500 text-xs text-center">{error.profile}</p>
            )}
            <input
              type="file"
              accept="image/*"
              name="profile"
              id="profile"
              ref={profileRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => profileRef.current.click()}
              className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Choose Profile Image
            </button>
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "First Name",
                name: "firstname",
                type: "text",
                placeholder: "John",
              },
              {
                label: "Last Name",
                name: "lastname",
                type: "text",
                placeholder: "Doe",
              },
              {
                label: "Email Address",
                name: "email",
                type: "email",
                placeholder: "john.doe@example.com",
              },
              {
                label: "Mobile Number",
                name: "mobile",
                type: "text",
                placeholder: "9876543210",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "••••••••",
              },
              {
                label: "Confirm Password",
                name: "confirmpassword",
                type: "password",
                placeholder: "••••••••",
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-zinc-300">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleInput}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2.5 rounded-xl bg-zinc-800 text-white text-sm outline-none border transition-all placeholder-zinc-500
                    ${
                      error[field.name]
                        ? "border-red-500 focus:border-red-500"
                        : focused === field.name
                        ? "border-red-500"
                        : "border-zinc-700 focus:border-red-500"
                    }`}
                />
                {error[field.name] && (
                  <p className="text-red-500 text-[11px] text-right">
                    {error[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-semibold rounded-xl text-lg shadow-lg shadow-red-600/20 cursor-pointer mt-4"
          >
            Register
          </button>

          {/* Redirect to login */}
          <div className="text-center text-sm text-zinc-400 mt-2">
            <span>Already have an account? </span>
            <NavLink
              to="/login"
              className="text-sky-400 hover:text-sky-300 underline font-medium"
            >
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
