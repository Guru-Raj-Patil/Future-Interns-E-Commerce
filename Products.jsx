import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getProducts");
        const data = await response.json();

        // Filter only valid products with name and price
        const validProducts = data.filter(
          (p) => p.name && p.price && p.category
        );

        setProducts(validProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // runs once on mount

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="products-container" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product) => (
        <div
          key={product._id}
          className="product-card"
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src={product.image || "https://via.placeholder.com/200"} // fallback image
            alt={product.name}
            style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
          />
          <h3>{product.name}</h3>

          {/* Show discounted price if offer exists */}
          {product.offer > 0 ? (
            <p>
              <span style={{ textDecoration: "line-through", color: "gray" }}>
                ₹{product.price}
              </span>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                ₹{(product.price - (product.price * product.offer) / 100).toFixed(2)}
              </span>
            </p>
          ) : (
            <p>₹{product.price}</p>
          )}

          {product.offer > 0 && (
            <p style={{ color: "green" }}>Offer: {product.offer}% OFF</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
