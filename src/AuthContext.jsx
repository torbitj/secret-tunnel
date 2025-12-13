import { createContext, useContext, useEffect, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [storedToken, setStoredToken] = useState('')
  const [name, setName] = useState('')
  const [token, setToken] = useState('');
  const [location, setLocation] = useState("GATE");

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    const localName = localStorage.getItem('name')
    localToken ? setStoredToken(localToken) : setStoredToken('')
    localName ? setName(localName) : setName('');
  }, [])

  
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
      const retrievedToken = signUpObj.token;
      localStorage.setItem('token', retrievedToken);
      localStorage.setItem('name', name);
      setToken(retrievedToken);
      setLocation("TABLET");
    } catch (error) {
      console.log(error)
    }
  }
  // TODO: authenticate

  const authenticate = async () => {
    try {
      console.log(token)
      if (!token) { throw new Error("No token to authenticate") }
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if (!response) { throw new Error("Unable to authenticate") }
      setLocation("TUNNEL") 
    } catch (error) {
      console.log(error)
    }
  }

  const value = { location, storedToken, name, signUp, authenticate, setLocation };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
