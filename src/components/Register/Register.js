import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import './Register.css';


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { login } = useAuth();

  console.log("username", username);
  console.log("email", email);
  console.log("password", password);

  const navigate = useNavigate();

  useEffect(() => {
    
    let token = process.env.REACT_APP_GCP_CLIENT_ID
    
    window.google.accounts.id.initialize({
      client_id:
      token,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" } 
    );
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();

    let payload = {
      username: username,
      email: email,
      password: password,
      password2: password2,
    };

    const response = await fetch("http://127.0.0.1:8000/auth_app/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 201) {
      alert("Registered Successfully");
      navigate("/login");
    }
  };

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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <form onSubmit={handleRequest} className="card p-4 shadow">
        <h2 className="text-center mb-4">Register</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input className="form-control" /* ... */ />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input className="form-control" /* ... */ />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input className="form-control" /* ... */ />
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="form-label">Repeat Password</label>
          <input className="form-control" /* ... */ />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-3">Register</button>
        <div id="signInDiv" className="text-center">
          {/* Google sign-in button */}
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default Register;
