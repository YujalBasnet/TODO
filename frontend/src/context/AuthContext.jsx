
import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const defaultUsers = [
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      password: "user123",
    },
  ];

  // Get registered users from localStorage
  const getUsers = () => {
    const savedUsers = localStorage.getItem("appUsers");

    if (savedUsers) {
      return JSON.parse(savedUsers);
    }

    localStorage.setItem("appUsers", JSON.stringify(defaultUsers));

    return defaultUsers;
  };

  // Current logged-in user
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("appUser")) || null
  );

  // LOGIN
  const login = async (value) => {
    const users = getUsers();

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === value.email.trim().toLowerCase() &&
        user.password === value.password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Don't store password in the logged-in session
    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    localStorage.setItem(
      "appUser",
      JSON.stringify(loggedInUser)
    );

    setCurrentUser(loggedInUser);

    return loggedInUser;
  };

  // REGISTER
  const register = async (value) => {
    const users = getUsers();

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === value.email.trim().toLowerCase()
    );

    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    const newUser = {
      id: Date.now(),
      name: value.name,
      email: value.email,
      password: value.password,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(
      "appUsers",
      JSON.stringify(updatedUsers)
    );

    return newUser;
  };

  // LOGOUT
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

