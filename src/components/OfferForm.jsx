import React, { useState } from "react";
import { useLogin } from "../LoginContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function OfferForm({ item }) {
  const { user } = useLogin();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSendOffer = () => {
    if (!user) {
      if (window.confirm("You need to be logged in to send an offer. Log in now?")) {
        navigate("/login");
      }
      return;
    }

    const newOffer = {
        id: uuidv4(),
        itemId: item.id,
        itemTitle: item.title,
        recipient: item.owner,         
        sender: user.username,         
        from: user.username,           
        to: item.owner,         
        message,
        timestamp: new Date().toISOString(),
        status: "pending"
    };

    const offers = JSON.parse(localStorage.getItem("offers")) || [];
    offers.push(newOffer);
    localStorage.setItem("offers", JSON.stringify(offers));
    setMessage("");
    alert("Offer sent!");
  };

  return (
    <div style={{
      marginTop: "1rem",
      border: "2px dashed #82a6f2",
      borderRadius: "10px",
      padding: "1rem",
      backgroundColor: "#f0f8ff"
    }}>
      <h4>Send an Offer</h4>
      <textarea
        className="form-control"
        placeholder="Write your trade offer..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        style={{ marginBottom: "0.5rem" }}
      />
      <button
        className="btn btn-primary"
        onClick={handleSendOffer}
        disabled={!message.trim()}
      >
        Send Offer
      </button>
    </div>
  );
}
