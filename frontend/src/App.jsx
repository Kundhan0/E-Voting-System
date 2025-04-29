import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Voting from "./components/voting";
import Header from "./components/header";
import Footer from "./components/footer";
import Stats from "./components/stats";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container flex flex-col min-h-screen">
        <Header /> {/* Header at the top */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vote" element={<Voting />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<Login />} /> {/* Default route */}
          </Routes>
        </main>
        <Footer /> {/* Footer at the bottom */}
      </div>
    </BrowserRouter>
  );
}

export default App;