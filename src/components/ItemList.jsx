import React from "react";
import ItemCard from "./ItemCard";

const items = [
    {
        id: 1,
        title: "Mini Fridge",
        description: "Perfect dorm-sized fridge in great condition",
        category: "Home Goods",
        tradeFor: "$100 or snacks",
        imageUrls: [
            "https://via.placeholder.com/300x200?text=Fridge1",
            "https://via.placeholder.com/300x200?text=Fridge2"
        ]
    },
  { id: 2, title: "Mini Fridge", description: "Dorm", tradeFor: "$100", category: "Home Goods" },
  { id: 3, title: "Baking Pan", description: "Used once", tradeFor: "non stick pan / $50", category: "Baking Equipment" },
  { id: 4, title: "Notebook", description: "Empty", tradeFor: "$2", category: "Stationery" }, 
];

export default function ItemList({ selectedCategory }) {
  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="container-fluid">
      <h3>{selectedCategory} Items</h3>
      <div className="row">
        {filteredItems.map(item => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
