import { signInWithPopup, getAuth } from "firebase/auth";
import React from "react";
import { auth, provider } from "./Firebase";
import { useNavigate } from "react-router-dom";
const login = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    alert("hello you are try to login via microsoft..");
    const loginResponse = await signInWithPopup(auth, provider);
    console.log(loginResponse);
    const user = loginResponse.user;
    const userData = {
      name: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatar: user.photoURL,
    };

    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "post",
      credentials: "include",
      headers: { "Content-type": "application" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
    }
    navigate("/dashboard");
  };
  return (
    <div>
      <h1>Click below for Microsoft Login</h1>
      <button onClick={handleLogin}>Login with Mirosoft</button>
    </div>
  );
};

export default login;
