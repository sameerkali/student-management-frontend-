import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import { baseUrl } from "../constants";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [responseMessage, setResponseMessage] = useState(""); // To display server responses
  const [isError, setIsError] = useState(false); // Track error state
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSignup = async () => {
    try {
      console.log("inside try");
      const response = await axios.post(`${baseUrl}/api/users/register`, {
        name,
        email,
        password,
        role
      });

      // Display success response
      setResponseMessage("Signup successful!");
      setIsError(false); // Reset error state
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.log("inside catch");

      // Check if error response is 400 and show specific message
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User already exists"
      ) {
        setResponseMessage("User already exists");
        setIsError(true); // Set error state to true for red color
      } else {
        setResponseMessage("Signup failed. Please try again.");
        setIsError(true); // Set error state for other errors
      }

      console.error(error);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Name"
        id="name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {/* Role selection using dropdown */}
      <select
        className="mb-4 form-control"
        id="role"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="schooladmin">School Admin</option>
        <option value="superadmin">Super Admin</option>
      </select>

      <MDBBtn className="mb-4" onClick={handleSignup}>
        Sign up
      </MDBBtn>

      {/* Display server response with conditional styling for error */}
      {responseMessage &&
        <p style={{ color: isError ? "red" : "green" }}>
          {responseMessage}
        </p>}
      <div className="text-center">
        <p>
          Already a member?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Signup;
