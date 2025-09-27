import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [offer, setOffer] = useState(""); // ✅ new
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const product = { name, description, price, category, brand, countInStock, image, offer };
      const { data } = await axios.post("http://localhost:5000/api/products", product, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(`Product "${data.name}" added successfully!`);

      // Clear the form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setBrand("");
      setCountInStock("");
      setImage("");
      setOffer("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Add New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input type="number" placeholder="Count In Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="number" placeholder="Offer (%)" value={offer} onChange={(e) => setOffer(e.target.value)} /> {/* ✅ new */}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;