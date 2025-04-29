import { signInWithPopup, getAuth } from "firebase/auth";

import { auth, provider } from "./Firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    const response = await axios.post(
      "http://localhost:3001/api/auth/login",
      {
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        avatar: userData.avatar,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.data;
    console.log(data);
    if (data.success) {
      alert("Login successfully");
    } else {
      alert("Login failed");
    }
    const Ok = await axios.get("http://localhost:3001/api/auth/get-user", {
      withCredentials: true,
    });
    console.log(Ok.data);
    console.log(Ok);

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
