import { useState } from "react";
import { useContext, createContext } from "react";
import userService from "../service/userService.js";
export const authContext = createContext(null);
// authContext.displayName = "auth-context";
function AuthProvider({ children }) {
  const [user, setUser] = useState(userService.getUser);
  const refreshUser = () => {
    setUser(userService.getUser());
  };
  const createUser = (user) => {
    return userService.createUser(user);
  };
  const login = async (credentials) => {
    const response = await userService.loginUser(credentials);
    refreshUser();
    return response;
  };
  const logOut = () => {
    userService.logOutUser();
    refreshUser();
  };

  return (
    <authContext.Provider value={{ createUser, login, logOut, user }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => {
  return useContext(authContext);
};
