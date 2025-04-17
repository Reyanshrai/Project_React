import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email form, 2: Password reset form, 3: Success
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/users/forgot-password", { email });
      
      // In a real app, we wouldn't show the token to the user.
      // Instead, they would receive it via email with a link.
      // For this demo, we'll show it in a toast and let them copy it.
      toast.success("Password reset link sent to your email");
      console.log("Reset token:", response.data.resetToken);
      
      // Automatically set the token for this demo - in real app this would come from email link
      setToken(response.data.resetToken);
      
      // Move to step 2
      setStep(2);
    } catch (err) {
      console.error("Error in forgot password:", err);
      setError(err.response?.data?.error || "Failed to send reset email. Please try again.");
      toast.error(err.response?.data?.error || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!token) {
      setError("Reset token is required");
      return;
    }
    
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/users/reset-password", {
        token,
        password,
        confirmPassword
      });
      
      toast.success("Password has been reset successfully");
      setStep(3);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Error in reset password:", err);
      setError(err.response?.data?.error || "Failed to reset password. Please try again.");
      toast.error(err.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // Email submission form (Step 1)
  const renderEmailForm = () => (
    <form onSubmit={handleEmailSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email address"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-800 sm:text-lg"
          required
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-2xl"
          disabled={loading}
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </div>
      <div className="text-center">
        <p className="text-lg text-gray-800 dark:text-gray-100">
          Remembered your password?{" "}
          <Link 
            to="/Login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Go To Login
          </Link>
        </p>
      </div>
    </form>
  );

  // New password form (Step 2)
  const renderResetForm = () => (
    <form onSubmit={handleResetSubmit}>
      <div className="mb-4">
        <label
          htmlFor="token"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Reset Token
        </label>
        <input
          type="text"
          id="token"
          name="token"
          placeholder="Enter reset token"
          value={token}
          onChange={handleTokenChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-800 sm:text-lg"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          In a real app, this would be included in the email link
        </p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter new password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-800 sm:text-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-800 sm:text-lg"
          required
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-2xl"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );

  // Success message (Step 3)
  const renderSuccessMessage = () => (
    <div className="text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Password Reset Successful!
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Your password has been updated successfully.
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Redirecting to login page...
      </p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center bg-gray-100 dark:bg-gray-900 pt-20" style={{
          backgroundImage: "url('./images/registerbg.png')",
        }}
      >
        <div
          className="shadow-lg rounded-lg p-8 max-w-lg w-full"
          style={{
            background: "transparent",
            // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            // backdropFilter: "blur(10px)",
          }}
        >
          <h2 className="text-3xl font-bold text-white-800 dark:text-white text-center mb-6">
            {step === 1 ? "Forgot Password" : step === 2 ? "Reset Password" : "Success"}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {step === 1 && renderEmailForm()}
          {step === 2 && renderResetForm()}
          {step === 3 && renderSuccessMessage()}
        </div>
      </div>
      
    </div>
  );
};

export default ForgotPassword;
