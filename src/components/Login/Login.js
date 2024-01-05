import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const sendLoginToServer = async (e) => {
    e.preventDefault();

    let payload = {
      username: username,
      password: password,
    };

    const response = await fetch("http://127.0.0.1:8000/auth_app/token/obtain/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      alert("Logged in Successfully");
      let data = await response.json();
      login(data);
      navigate("/");
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "948437153038-ji2e0m83j882bsk3vchgrfksl08ds6o4.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" } 
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
  
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/auth_app/login/google/", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ google_token: response.credential }),
        }
      );
  
      if (res.status === 200) {
        const data = await res.json();
        console.log("Login successful", data);
        login(data); 
        navigate("/")
      } else {
        console.error("Failed to log in", res.status, res.statusText);
        alert("Failed to log in. Please try again.");
      }
    } catch (error) {
      console.error("Error during login", error);

      alert("An error occurred during login. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5">
      <form onSubmit={sendLoginToServer} className="border p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter Username"
            name="username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            name="password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-cstm">Login</button>
        <div id="signInDiv" className="mt-3"></div>
      </form>
    </div>
  );
}
export default Login;
