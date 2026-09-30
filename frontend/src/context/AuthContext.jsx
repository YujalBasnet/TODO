import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("appUser")) || null
  );

  //LOGIN
  const login = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          email: value.email,
          password: value.password,
        }
      );

      const loggedInUser = response.data.user;

      //Store logged in user

      localStorage.setItem(
        "appUser",
        JSON.stringify(loggedInUser)
      );
      localStorage.setItem("token", response.data.token);

      setCurrentUser(loggedInUser);

      return loggedInUser;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  //REGISTER
  const register = async (value) => {
    try {

      const data = new FormData();

      data.append("name", value.name);
      data.append("email", value.email);
      data.append("password", value.password);

      if (value.image) {
        data.append("image", value.image);
      }

      if (value.phone){
        data.append("phone", value.phone);
      }

      const response = await axios.post(
        "http://localhost:5000/user/register",
        data 
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  //LOGOUT
  const logout = () => {
    localStorage.removeItem("appUser");
    setCurrentUser(null);
  };

  
  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        currentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
