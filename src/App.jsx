import React from "react";
import { HashRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import NewItemForm from "./components/NewItemForm";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CreateProfile from "./components/CreateProfile";

export default function App() {
  return (
    <HashRouter>
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",   // force full screen width
        minHeight: "100vh",
        overflowX: "hidden", // stop weird horizontal scroll
      }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewItemForm />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/create" element={<CreateProfile />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

