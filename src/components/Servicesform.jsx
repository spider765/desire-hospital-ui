import React, { useState } from "react";

function ServiceForm({ onServiceCreated }) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1️⃣ Use the global API URL
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("title", title);
            formData.append("text", text);
            formData.append("description", description);
            if (logo) formData.append("logo", logo);
            if (image) formData.append("image", image);

            // 2️⃣ Updated fetch URL to use the dynamic API_URL
            const res = await fetch(`${API_URL}/services`, {
                method: "POST",
                body: formData
                // Note: Browser automatically handles Content-Type for FormData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to create service");
            }

            const newService = await res.json();
            
            // Safety check in case the parent prop isn't passed
            if (onServiceCreated) {
                onServiceCreated(newService);
            }

            alert("✅ Service added successfully!");

            // Reset form
            setName("");
            setTitle("");
            setText("");
            setDescription("");
            setLogo(null);
            setImage(null);
        } catch (err) {
            setError(err.message);
            console.error("Submission error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ 
                background: "#fff", 
                padding: "1.5rem", 
                borderRadius: "8px", 
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
        >
            <h4 style={{ color: "#2E7D32" }}>Add New Service</h4>
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <input
                type="text"
                placeholder="Service Name (e.g. Cardiology)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
            />
            <input
                type="text"
                placeholder="Title (e.g. Heart Specialist)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
            />
            <input
                type="text"
                placeholder="Short Intro Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={inputStyle}
            />
            <textarea
                placeholder="Full Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, minHeight: "80px" }}
            />
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
                <label style={labelStyle}>
                    Logo Icon:
                    <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
                </label>
                <label style={labelStyle}>
                    Featured Image:
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                </label>
            </div>

            <button 
                type="submit" 
                disabled={loading} 
                style={buttonStyle(loading)}
            >
                {loading ? "Saving to Cloud..." : "Add Service"}
            </button>
        </form>
    );
}

const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

const labelStyle = {
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    color: "#555"
};

const buttonStyle = (loading) => ({
    backgroundColor: "#2E7D32",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    marginTop: "10px"
});

export default ServiceForm;