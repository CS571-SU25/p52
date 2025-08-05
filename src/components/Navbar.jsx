import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../LoginContext";

export default function Navbar() {
  const { user, logout } = useLogin();
  const navigate = useNavigate(); 

  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkStyle = {
    marginRight: "1rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: "black",
    backgroundColor: "white",
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    transition: "background-color 0.2s ease",
    border: "3px solid crimson",
  };

  return (
    <>
      <div style={{
        backgroundColor: "#fff0f0",
        textAlign: "center",
        fontSize: "0.9rem",
        padding: "0.05rem",
        color: "#8a1f1f",
        fontStyle: "italic"
      }}>
        Trade with other UW Madison Students!
      </div>

      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "1rem 2rem",
        backgroundColor: "#f28b82",
        borderBottom: "2px solid #2b1412",
        boxShadow: "0px 3px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Link to="/" style={navLinkStyle}>UW Trade</Link>
          <Link to="/new" style={navLinkStyle}>List Item</Link>
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link to="/profile/create" style={navLinkStyle}>Create Profile</Link>
            </>
          ) : (
            <>
              <Link to={`/profile/${user.username}`} style={navLinkStyle}>View Profile</Link>
              <button onClick={handleLogout} style={{
                ...navLinkStyle,
                border: "3px solid crimson",
                color: "crimson",
                backgroundColor: "white",
                cursor: "pointer"
              }}>
                Logout
              </button>
              <Link to="/offers" style={navLinkStyle}>Offers</Link>
              <Link to="/offers/sent" style={navLinkStyle}>Sent Offers</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
