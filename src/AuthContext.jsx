import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signUp = async (name) => {
    try {
      const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name})
      })
      if (!response.ok) {
        throw new Error("Unable to sign up user");
      }
      const signUpObj = await response.json();
      const retrievedToken = signUpObj.token
      setToken(retrievedToken);
      setLocation("TABLET")
    } catch (error) {
      console.log(error)
    }
  }
  // TODO: authenticate

  const value = { location, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
