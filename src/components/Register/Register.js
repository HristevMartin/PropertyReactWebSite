import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import './Register.css';

const apiUrl = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : "https://django-estate-agent-dot-gym-pro-410823.uc.r.appspot.com";
console.log('apiUrl', apiUrl);

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

    const clientId = '419141935816-l55gn89pm881kmsv0q82at4iga8a6fkh.apps.googleusercontent.com';
    
    window.google.accounts.id.initialize({
      client_id: clientId,
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

    console.log('show me the payload', payload);

    const response = await fetch(`${apiUrl}/auth_app/register/`, {
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
        `${apiUrl}/auth_app/login/google/`, 
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
          <input className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
          className="form-control"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
          className="form-control"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="form-label">Repeat Password</label>
          <input className="form-control"
          type="password"
          id="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-3">Register</button>
        <div id="signInDiv" className="text-center custom-google-div">
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default Register;
