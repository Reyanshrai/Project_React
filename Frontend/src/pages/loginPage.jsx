import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/userContext';
import axios from "../config/axios";

const Login = () => {
    const { login } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Invalid email address");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        axios.post("/users/login", {
            email: formData.email,
            password: formData.password,
        })
        .then((res) => {
            console.log(res.data);
            login(res.data);
            navigate("/dashboard");
        })
        .catch((err) => {
            console.log(err.response?.data);
            setError(err.response?.data?.message || "Invalid Email or Password");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center bg-cover bg-center bg-gray-100 dark:bg-gray-900 pt-20" style={{
                backgroundImage: "url('./images/registerbg.png')",
            }}>
                <div className="shadow-lg rounded-lg p-8 max-w-lg w-full" style={{
                    background: "transparent",
                }}>
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-center mb-6">
                        Login Form
                    </h2>
                    {error && (
                        <div className="text-red-500 text-center mb-4">{error}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-800 sm:text-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-800 sm:text-lg"
                                required
                            />
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline dark:text-blue-400 mt-2 block">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-2xl"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                        <div className="text-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100">
                                Don’t have an account?{' '}
                                <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                                    Go To Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;