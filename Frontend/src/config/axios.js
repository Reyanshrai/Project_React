import axios from "axios";

// Create axios instance with base URL
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    }
});

// Add a request interceptor to include the appropriate token for each request
axiosInstance.interceptors.request.use(
    (config) => {
        // First check if this is an admin-specific endpoint
        const isAdminEndpoint = config.url?.includes('/admins') || 
                               config.url?.includes('/trainers') ||
                               config.url === '/users/all';
        
        if (isAdminEndpoint) {
            // Use admin token for admin endpoints
            const adminToken = localStorage.getItem("admin_token");
            if (adminToken) {
                config.headers["Authorization"] = `Bearer ${adminToken}`;
            }
        } else {
            // Use regular user token for all other endpoints
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;