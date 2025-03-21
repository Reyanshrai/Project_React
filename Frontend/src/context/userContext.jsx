import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Initialize user from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("userData");
        
        if (token && storedUserData) {
            try {
                const userData = JSON.parse(storedUserData);
                setUser(userData);
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
            }
        }
    }, []);

    const login = (userData) => {
        if (!userData || !userData.token || !userData.firstname) {
            console.error("Invalid user data");
            return;
        }
        
        // Ensure we rename id property to _id for consistency
        const formattedUserData = {
            ...userData,
            _id: userData._id || userData.id
        };
        
        setUser(formattedUserData);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userData", JSON.stringify(formattedUserData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};