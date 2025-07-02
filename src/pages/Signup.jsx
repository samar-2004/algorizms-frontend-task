import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  // Form field states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("shipper");

  // UI state for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Stores validation error messages per field
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  /**
   * Validates individual fields on blur or submit
   */
  const validateField = (field, value) => {
    switch (field) {
      case "email":
        if (!value) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format.";
        return "";
      case "phone":
        if (!value) return "Phone number is required.";
        if (!/^\d{11}$/.test(value)) return "Phone number must be 11 digits.";
        return "";
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        return "";
      default:
        return "";
    }
  };

  /**
   * Validates a single field when it loses focus
   */
  const handleBlur = (field, value) => {
    const errMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errMsg }));
  };

  /**
   * Form submission handler
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before allowing submit
    const emailErr = validateField("email", email);
    const phoneErr = validateField("phone", phone);
    const passwordErr = validateField("password", password);

    if (emailErr || phoneErr || passwordErr) {
      setErrors({ email: emailErr, phone: phoneErr, password: passwordErr });
      return;
    }

    setErrors({});

    // ✅ PLACEHOLDER: Replace with actual signup API call
    // Example:
    // axios.post('/api/signup', { email, phone, password, role }).then(...)
    toast.success("Signed up successfully!");
    setTimeout(() => navigate("/loads"), 500);
  };

  /**
   * Dynamic class for input styling with error indication
   */
  const inputClass = (field) =>
    `w-full px-4 py-2 bg-gray-900 border ${
      errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
    } text-white rounded-lg focus:ring-2 outline-none`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800/70 backdrop-blur-xl shadow-2xl border border-blue-800/30">
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleBlur("email", e.target.value)}
              className={inputClass("email")}
              placeholder="example@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number Input (Only digits, 11 max) */}
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-200">Phone Number</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={11}
              value={phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                setPhone(onlyNums);
              }}
              onBlur={(e) => handleBlur("phone", e.target.value)}
              className={inputClass("phone")}
              placeholder="03XXXXXXXXX"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-200">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="shipper">Shipper</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-200">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => handleBlur("password", e.target.value)}
                className={`${inputClass("password")} pr-10`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors text-white py-2.5 rounded-xl font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Navigation to Login Page */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
