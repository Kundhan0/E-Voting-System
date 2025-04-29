import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const Navigate = useNavigate();


  async function handleLogin(e) {
    e.preventDefault();
  
    // console.log({ username, email, password }); // Debugging log
  
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include cookies for session handling
    });
  
    const result = await response.json();
  
    if (result.success) {
      setOutputMessage("Login successful!");
      setUsername(result.username);
      Navigate("/vote");
    } else {
      setOutputMessage(result.message || "Login failed. Please try again.");
    }
  }

  function handleRegister() {
    Navigate("/register");
  }
  return (
    <>

      <div className="flex flex-col w-100 m-auto mt-10 self-center justify-center items-center bg-blue-400 rounded-md">
        <form
          action=""
          method="post"
          className="flex flex-col w-100 m-auto mt-10 self-center justify-center items-center"
          onSubmit={handleLogin}
        >
          <label
            htmlFor="name"
            className="self-center text-black text-xl font-bold"
          >
            UserName
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
            placeholder="Enter your email"
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
            name="password"
            id="password"
            type="password"
            placeholder="Enter your Password"
            className="border-2 bg-blue-400 w-80 border-black-300 rounded-md p-2 m-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="w-30 text-xl border-2 bg-blue-400 border-black-300 rounded-md p-1 m-1 mt-5"
            >
              Login
            </button>
          </div>
        </form>
        <button
              type="submit"
              onClick={handleRegister}
              className="h-8 border-2 bg-blue-400 border-black-300 rounded-md p-1 m-1 mt-2"
            >
              Register
            </button>
        <div id="output" className="mt-5 text-black text-xl font-bold">
          {outputMessage}
        </div>
      </div>
    </>
  );
}
