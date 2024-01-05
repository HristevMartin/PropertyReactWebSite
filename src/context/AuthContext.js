import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorageHook";

const initialUserState = {
  id: "",
  email: "",
  access_token: "",
  refresh_token: "",
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", initialUserState);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    console.log("calling the logOut function");
    setUser(initialUserState);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth_app/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: user.refresh_token }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Update user state with new access token
        setUser({ ...user, access_token: data.access });
      } else {
        // Logout if refresh fails
        logout();
      }
    } catch (error) {
      // Logout on network error or other exception
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
