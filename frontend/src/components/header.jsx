import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/api/logout", {
            method: "POST",
            credentials: "include", // Include cookies for session handling
        });

        const result = await response.json();
        if (result.success) {
            navigate("/"); // Redirect to the login page
        } else {
            console.error("Logout failed:", result.message);
        }
    };

    return (
        <header className="flex justify-between font-2xl font-bold items-center h-16 bg-blue-400 text-black mt-4 rounded-50mx-auto flex  items-center gap-x-4 rounded-xl  p-6 shadow-lg outline outline-black/5 ">
            <h1>Voting App</h1>
            <nav className="">
                <ul className="flex justify-evenly items-center gap-x-4">
                    <li><Link to="/vote">Vote</Link></li>
                    <li><Link to="/stats">Stats</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </header>
    );
}