import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("cheapest");

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  const filterAndSortItems = () => {
    let filtered = [...items];

    filtered = filtered.filter(item => item.status !== "gone");

    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortOrder === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
    return filtered;
  };

  const categories = ["All", "Textbooks", "Home Goods", "Stationery", "Baking Equipment"];

  return (
    <div style={{ backgroundColor: "#d63c31", minHeight: "100vh", padding: "2rem" }}>
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="bg-white p-3 rounded shadow">
              <h4 className="mb-3">Search</h4>
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <h4 className="mb-3">Categories</h4>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`btn ${selectedCategory === cat ? "btn-dark" : "btn-outline-dark"} w-100 mb-2`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}

              <h4 className="mt-4 mb-2">Sort By</h4>
              <div className="d-grid gap-2">
                {[
                  { value: "recent", label: "Newest First" },
                  { value: "oldest", label: "Oldest First" }
                ].map(option => (
                  <button
                    key={option.value}
                    className={`btn ${sortOrder === option.value ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => setSortOrder(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-center mb-4">Available Items</h3>
              <div className="row g-4">
                {filterAndSortItems().map(item => (
                  <div key={item.id} className="col-12 col-sm-6 col-md-4">
                    <ItemCard item={item} onDelete={handleDelete} />
                  </div>
                ))}
                {filterAndSortItems().length === 0 && (
                  <p className="text-center">No items found.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
