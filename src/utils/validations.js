// Validation for registration form fields
export function validateField(name, value, formData = {}) {
  switch (name) {
    case "firstname":
      if (!value) return "First name is required";
      if (value.length < 4) return "Min 4 characters required";
      if (value.length > 16) return "Max 16 characters allowed";
      return "";

    case "lastname":
      if (!value) return "Last name is required";
      if (value.length < 4) return "Min 4 characters required";
      if (value.length > 16) return "Max 16 characters allowed";
      return "";

    case "email":
      if (!value) return "Email is required";
      {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) return "Enter a valid email address";
      }
      return "";

    case "mobile":
      if (!value) return "Mobile number is required";
      {
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(value)) return "Number must be 10 digits";
      }
      return "";

    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      return "";

    case "confirmpassword":
      if (!value) return "Please confirm your password";
      if (value !== formData.password) return "Passwords do not match";
      return "";

    default:
      return "";
  }
}

// Validation for login form fields

export const validateLogin = (data) => {
  const errors = {};

  // Username (email) validation
  if (!data.username.trim()) {
    errors.username = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.username)) {
    errors.username = "Enter a valid email address";
  }

  // Password validation
  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};
