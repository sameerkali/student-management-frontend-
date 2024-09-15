import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import { baseUrl } from "../constants";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for navigation after login

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // For displaying server responses
  const [isError, setIsError] = useState(false); // Track error state
  const navigate = useNavigate(); // To redirect after login

  // Function to handle login submission
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/users/login`, {
        email,
        password
      });

      // If login is successful, destructure the token and user object from the response
      const { token, user } = response.data;

      // Store the token and role in localStorage for all users
      localStorage.setItem("token", token); // Store token
      localStorage.setItem("role", user.role); // Store role
      setResponseMessage("Login successful!");
      setIsError(false); // Reset error state on success
      console.log("Token and role stored: ", token, user.role);

      // Redirect based on the role
      if (user.role === "schooladmin") {
        navigate("/school-admin-dashboard");
      } else if (user.role === "superadmin") {
        navigate("/super-admin-dashboard");
      } else if (user.role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/dashboard"); // Default redirect if role doesn't match
      }
    } catch (error) {
      console.log("inside catch");

      // Check for specific error message
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User not found"
      ) {
        setResponseMessage("User not found. Please check your email.");
        setIsError(true); // Show error in red
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Incorrect password"
      ) {
        setResponseMessage("Incorrect password. Please try again.");
        setIsError(true); // Show error in red
      } else {
        setResponseMessage("Login failed. Please try again.");
        setIsError(true); // Show generic error
      }

      console.error(error);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <MDBBtn className="mb-4" onClick={handleLogin}>
        Sign in
      </MDBBtn>

      {/* Display server response with conditional styling */}
      {responseMessage &&
        <p style={{ color: isError ? "red" : "green" }}>
          {responseMessage}
        </p>}

      <div className="text-center">
        <p>
          Not a member?
          <Link to="/register">Register</Link>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Login;
