import React, { useState } from 'react';

export default function DoctorsForm() {
    // Form state
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Use environment variable for production, fallback to localhost for dev
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("specialty", specialty);
        formData.append("description", description);
        if (image) {
            formData.append("image", image); 
        }

        try {
            const res = await fetch(`${API_URL}/doctors`, {
                method: "POST",
                body: formData
                // Note: Do NOT set Content-Type header when sending FormData; 
                // the browser sets it automatically with the boundary string.
            });

            if (res.ok) {
                alert("✅ Doctor added successfully!");
                // Reset form
                setName("");
                setSpecialty("");
                setDescription("");
                setImage(null);
                // If you have a redirect or a refresh function, call it here
            } else {
                const errorData = await res.json();
                console.error("Server error:", errorData);
                alert("❌ Failed to add doctor. Check console for details.");
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("❌ Network error. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ color: '#2E7D32' }}>Add New Doctor</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="e.g. Dr. Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="specialty">Specialty</label>
                    <input
                        id="specialty"
                        type="text"
                        placeholder="e.g. Cardiology"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="description">Bio/Description</label>
                    <textarea
                        id="description"
                        placeholder="Tell us about the doctor..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ ...inputStyle, minHeight: '80px' }}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="image">Profile Photo</label>
                    <input
                        id="image"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        style={inputStyle}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    style={buttonStyle(loading)}
                >
                    {loading ? "Adding..." : "Add Doctor"}
                </button>
            </form>
        </section>
    );
}

// Styling
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
};

const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px'
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
    transition: '0.3s'
});