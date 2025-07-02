import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Field-level validation logic
  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format.';
        return '';
      case 'password':
        if (!value) return 'Password is required.';
        if (value.length < 6) return 'Password must be at least 6 characters.';
        return '';
      default:
        return '';
    }
  };

  // Triggered when input loses focus — shows error immediately
  const handleBlur = (field, value) => {
    const errMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errMsg }));
  };

  // Form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const emailErr = validateField('email', email);
    const passwordErr = validateField('password', password);

    if (emailErr || passwordErr) {
      setErrors({ email: emailErr, password: passwordErr });
      return;
    }

    setErrors({});

    // ✅ PLACEHOLDER: Replace with API call to backend
    // Example: axios.post('/api/login', { email, password }).then(...)
    toast.success('Logged in successfully!');

    // Navigate to dashboard or load page after login
    setTimeout(() => navigate('/loads'), 500);
  };

  // Reusable input styling logic with error highlighting
  const inputClass = (field) =>
    `w-full px-4 py-2 bg-gray-900 border ${
      errors[field] ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
    } text-white rounded-lg focus:ring-2 outline-none`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800/70 backdrop-blur-xl shadow-2xl border border-blue-800/30">
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              placeholder="example@gmail.com"
              className={inputClass('email')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-200">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => handleBlur('password', e.target.value)}
                placeholder="••••••••"
                className={`${inputClass('password')} pr-10`}
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
            Log In
          </button>
        </form>

        {/* Switch to Signup Link */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
