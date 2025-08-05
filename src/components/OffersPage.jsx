import React, { useEffect, useState } from "react";
import { useLogin } from "../LoginContext";
import { Link } from "react-router-dom";

export default function OffersPage() {
  const { user } = useLogin();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const allOffers = JSON.parse(localStorage.getItem("offers")) || [];
    const userOffers = allOffers.filter((offer) => offer.to === user?.username);

    // Mark as read
    const updatedAllOffers = allOffers.map((offer) =>
      offer.to === user?.username ? { ...offer, read: true } : offer
    );
    localStorage.setItem("offers", JSON.stringify(updatedAllOffers));
    localStorage.setItem(`offer_badge_${user?.username}`, "0");

    setOffers(userOffers);
  }, [user]);

  const handleAcceptOffer = (offer) => {
    const allOffers = JSON.parse(localStorage.getItem("offers")) || [];
    const allItems = JSON.parse(localStorage.getItem("items")) || [];

    const updatedOffers = allOffers.filter((o) => o.itemId !== offer.itemId);
    const updatedItems = allItems.filter((i) => i.id !== offer.itemId);

    localStorage.setItem("offers", JSON.stringify(updatedOffers));
    localStorage.setItem("items", JSON.stringify(updatedItems));

    setOffers(updatedOffers.filter((o) => o.to === user?.username));

    alert(`You accepted the offer from ${offer.from}!`);
  };

  const handleDeclineOffer = (offerId) => {
    const allOffers = JSON.parse(localStorage.getItem("offers")) || [];
    const updatedOffers = allOffers.map((offer) =>
      offer.id === offerId ? { ...offer, status: "declined" } : offer
    );

    localStorage.setItem("offers", JSON.stringify(updatedOffers));
    setOffers(updatedOffers.filter((o) => o.to === user?.username));
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", minHeight: "100vh", backgroundColor: "#fff" }}>
      <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Your Offers
      </h1>

      {offers.length === 0 ? (
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          No offers yet.{" "}
          <Link to="/" style={{ color: "#d32f2f", fontWeight: "bold", textDecoration: "underline" }}>
            Go make some trades!
          </Link>
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="offer-card"
              style={{
                background: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                margin: "1rem auto",
                maxWidth: "600px"
              }}
            >
              <img
                src={offer.itemImage || "https://via.placeholder.com/300x200?text=No+Image"}
                alt="Item"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "4px"
                }}
              />
              <p><strong>From:</strong> {offer.from}</p>
              <p><strong>Message:</strong> {offer.message}</p>
              <p><strong>For item:</strong> {offer.itemTitle}</p>

              {offer.status === "declined" ? (
                <p style={{ color: "red", fontWeight: "bold" }}>❌ Declined</p>
              ) : offer.status === "accepted" ? (
                <p style={{ color: "green", fontWeight: "bold" }}>✅ Accepted</p>
              ) : (
                <>
                  <button
                    onClick={() => handleAcceptOffer(offer)}
                    style={{
                      marginTop: "0.5rem",
                      marginRight: "0.5rem",
                      padding: "0.4rem 1rem",
                      backgroundColor: "#2196f3",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px"
                    }}
                  >
                    Accept Offer
                  </button>
                  <button
                    onClick={() => handleDeclineOffer(offer.id)}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.4rem 1rem",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px"
                    }}
                  >
                    Decline Offer
                  </button>
                </>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
