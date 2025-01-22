import { createContext,useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [user,setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("token",userData.token);
        localStorage.setItem("firstName",JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
    }


    return (
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
}