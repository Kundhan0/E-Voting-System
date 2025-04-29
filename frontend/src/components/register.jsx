import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const navigate = useNavigate();

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birth date in the current year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  async function handleRegister(e) {
    e.preventDefault();
  
    // Calculate age based on date of birth
    const age = calculateAge(dateOfBirth);
  
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        address,
        age,
        gender,
        dateOfBirth,
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    const result = await response.json();
  
    if (result.success) {
      setOutputMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after 2 seconds
    } else {
      setOutputMessage(result.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex flex-col w-100 m-auto mt-10 self-center justify-center items-center bg-blue-200 rounded-md">
      <form
        action=""
        method="post"
        className="flex flex-col w-100 m-auto mt-10 self-center justify-center items-center"
        onSubmit={handleRegister}
      >
        <label
          htmlFor="username"
          className="self-center text-black text-xl font-bold"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your Username"
          className="border-2 bg-blue-400 w-80 border-black-300 rounded-md p-2 m-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label
          htmlFor="email"
          className="self-center text-black text-xl font-bold"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          className="border-2 bg-blue-400 w-80 border-black-300 rounded-md p-2 m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label
          htmlFor="password"
          className="self-center text-black text-xl font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          className="border-2 bg-blue-400 w-80 border-black-300 rounded-md p-2 m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label
          htmlFor="address"
          className="self-center text-black text-xl font-bold"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter your Address"
          className="border-2 bg-blue-400 w-80 border-black-300 rounded-md p-2 m-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label
          htmlFor="gender"
          className="self-center text-black text-xl font-bold"
        >
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          className="border-2 bg-blue-400 w-80 border-black-300 rounded-md p-2 m-2"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label
          htmlFor="dateOfBirth"
          className="self-center text-black text-xl font-bold"
        >
          Date of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          className="border-2 bg-blue-400 w-80 border-black-300 rounded-md p-2 m-2"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <div>
          <button
            type="submit"
            className="border-2 bg-blue-400 border-black-300 rounded-md p-2 m-2 mt-5"
          >
            Register
          </button>
        </div>
      </form>
      <div>
        <button
            onClick={() => navigate("/api/login")}
          type="submit"
          className="border-2 bg-blue-400 border-black-300 rounded-md p-2 m-2 mt-5"
        >
          Login
        </button>
      </div>
      <div id="output" className="mt-5 text-black text-xl font-bold">
        {outputMessage}
      </div>
    </div>
  );
}
