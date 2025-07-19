import React from "react";
import { useParams } from "react-router";

export default function UserProfile() {
  const { id } = useParams();

  // Dummy user
  const user = {
    name: "Liam M.",
    grade: "Junior",
    contact: "matthiasson@wisc.edu",
    interests: ["CS", "Books", "Gaming"],
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{user.name} (ID: {id})</h2>
      <p>Grade: {user.grade}</p>
      <p>Contact: {user.contact}</p>
      <p>Interests: {user.interests.join(", ")}</p>
    </div>
  );
}
