import React from "react";
import { Link } from "react-router";
import { useLogin } from "../LoginContext";

export default function Navbar() {
    const { isLoggedIn, userId } = useLogin();
    
    return (
        <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd"
        }}>
        <div>
            <Link to="/" style={{ marginRight: "1rem", fontWeight: "bold" }}>UW Trade</Link>
            <Link to="/new" style={{ marginRight: "1rem", fontWeight: "bold"}}>List Item</Link>
        </div>
        <div>
            {!isLoggedIn && ( 
                <>
                    <Link to="/login" style={{ marginRight: "1rem", fontWeight: "bold" }}>Login</Link>
                    <Link to="/profile/create" style={{ marginRight: "1rem", fontWeight: "bold" }}>Create Profile</Link>
                </>
            )}
            {isLoggedIn && (
            <Link to={`/profile/${userId}`} style={{ marginRight: "1rem", fontWeight: "bold" }}>View Profile</Link>
            )}
        </div>
        </nav>
    );
}
