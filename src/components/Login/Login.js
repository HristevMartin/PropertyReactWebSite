import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Login.css';

// const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
let apiUrl= process.env.REACT_APP_API_URL;


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();
  const sendLoginToServer = async (e) => {
    e.preventDefault();
    console.log('doing the request');

    let payload = {
      email: email,
      password: password,
    };

    const response = await fetch(`${apiUrl}/auth_app/token/obtain/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log('here')
    if (response.status === 200) {
      alert("Logged in Successfully");
      let data = await response.json();
      login(data);
      navigate("/");
    }else if(response.status === 400){
      console.log("Wrong Credentials", response.status);
      alert("Wrong Credentials... Please try again")
    }
  };

  useEffect(() => {
    let token = process.env.REACT_APP_GCP_CLIENT_ID

    window.google.accounts.id.initialize({
      client_id: token,
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
        `${apiUrl}/auth_app/login/google/`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ google_token: response.credential }),
        }
      );

      console.log('show me the status code', res.status)
      
      if (res.status === 200) {
        const data = await res.json();
        console.log("Login successful", data);
        login(data); 
        navigate("/")
      }else if(res.status === 400){
        console.log("Wrong Credentials", res.status, res.statusText);
        alert("Wrong Credentials... Please try again")
      }
       else {
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
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            name="email"
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
        <div id="signInDiv" style={{marginLeft: '52px'}} className="mt-3"></div>
      </form>
    </div>
  );
}
export default Login;
