import React, { useState } from "react";
import { Carousel } from 'react-bootstrap';

export default function ItemCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card h-100 shadow-sm" onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
      {/* Image or carousel */}
      {item.imageUrls && item.imageUrls.length > 1 ? (
        <Carousel interval={null}>
          {item.imageUrls.map((url, index) => (
            <Carousel.Item key={index}>
              <img src={url} className="d-block w-100" style={{ height: "200px", objectFit: "cover" }} alt={`Image ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <img
          src={item.imageUrls?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          alt={item.title}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text"><strong>Wants:</strong> {item.tradeFor || "—"}</p>

        {expanded && (
          <div className="mt-2">
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            {/* Add more fields like contact, condition, etc. here */}
          </div>
        )}
      </div>
    </div>
  );
}
