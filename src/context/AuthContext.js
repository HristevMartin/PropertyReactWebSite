import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorageHook";

const initialUserState = {
  id: "",
  email: "",
  access_token: "",
  refresh_token: "",
};

let apiUrl= process.env.REACT_APP_API_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", initialUserState);

  const login = (user) => {
    console.log('being called..');
    console.log('user');
    setUser(user);
  };

  console.log('user', user);

  const logout = () => {
    console.log("calling the logOut function");
    setUser(initialUserState);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/auth_app/token/refresh/`,
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
        setUser({ ...user, access_token: data.access });
      } else {
        logout();
      }
    } catch (error) {
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
