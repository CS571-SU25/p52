import React, { useState } from "react";
import { useLogin } from "../LoginContext";
import SendOfferModal from "./SendOfferModal";

export default function ItemCard({ item, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const { user } = useLogin();

  const handleSendOffer = (message) => {
    const offers = JSON.parse(localStorage.getItem("offers")) || [];

    const alreadyOffered = offers.some(
      (o) => o.from === user.username && o.itemId === item.id
    );

    if (alreadyOffered) {
      alert("You have already sent an offer for this item.");
      return;
    }

    const newOffer = {
      id: Date.now(),
      from: user.username,
      to: item.owner,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.image || null,  // ✅ Base64 image from item
      message,
      timestamp: new Date().toISOString(),
      notification: null,
      read: false,
      status: "pending"
    };

    try {
      const updatedOffers = [...offers, newOffer];

      // Keep only last 50 offers
      const trimmed = updatedOffers.slice(-50);
      localStorage.setItem("offers", JSON.stringify(trimmed));

      alert("Offer sent!");
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        alert("Storage limit exceeded. Try deleting old offers or compressing images further.");
      } else {
        console.error("Failed to store offer", e);
      }
    }
  };

  return (
    <>
      <div
        className="card h-100 shadow-sm"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={item.image || "https://via.placeholder.com/300x200?text=No+Image"}
          className="card-img-top"
          alt={item.title}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
          }}
        />

        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text"><strong>Wants:</strong> {item.desired || "—"}</p>

          {expanded && (
            <div className="mt-2">
              <p><strong>Category:</strong> {item.category}</p>

              {user?.username !== item.owner && (
                <button
                  className="btn btn-sm btn-success mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOfferModal(true);
                  }}
                >
                  Send Offer
                </button>
              )}

              {user?.username === item.owner && (
                <button
                  className="btn btn-sm btn-danger mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <SendOfferModal
        show={showOfferModal}
        onHide={() => setShowOfferModal(false)}
        onSubmit={handleSendOffer}
      />
    </>
  );
}
