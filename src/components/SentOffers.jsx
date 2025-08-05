import React, { useEffect, useState } from "react";
import { useLogin } from "../LoginContext";

export default function SentOffersPage() {
  const { user } = useLogin();
  const [sentOffers, setSentOffers] = useState([]);

  useEffect(() => {
    const allOffers = JSON.parse(localStorage.getItem("offers")) || [];
    const mySent = allOffers.filter((offer) => offer.from === user?.username);
    setSentOffers(mySent);
  }, [user]);

  const handleClearDeclined = () => {
    const allOffers = JSON.parse(localStorage.getItem("offers")) || [];
    const remaining = allOffers.filter(
      (offer) => !(offer.from === user?.username && offer.status === "declined")
    );
    localStorage.setItem("offers", JSON.stringify(remaining));
    setSentOffers(remaining.filter((o) => o.from === user?.username));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return { color: "green", fontWeight: "bold" };
      case "declined":
        return { color: "red", fontWeight: "bold" };
      default:
        return { color: "#888" };
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Sent Offers
      </h1>

      {sentOffers.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={handleClearDeclined}
            style={{
              padding: "0.5rem 1.2rem",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            Clear Declined Offers
          </button>
        </div>
      )}

      {sentOffers.length === 0 ? (
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          You haven’t sent any offers yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {sentOffers.map((offer) => (
            <div
              key={offer.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "1.2rem",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#fafafa"
              }}
            >
              <p><strong>To:</strong> {offer.to}</p>
              <p><strong>Item:</strong> {offer.itemTitle}</p>
              <p><strong>Message:</strong> {offer.message}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span style={getStatusStyle(offer.status)}>{offer.status || "pending"}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
