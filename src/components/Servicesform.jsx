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

            const res = await fetch("https://desire-specialist-hospital.onrender.com/services", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                throw new Error("Failed to create service");
            }

            const newService = await res.json();
            onServiceCreated(newService);
            setName("");
            setTitle("");
            setText("");
            setDescription("");
            setLogo(null);
            setImage(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ background: "#fff", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}
        >
            <h4>Add New Service</h4>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Short Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>
                Logo:
                <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
            </label>
            <label>
                Image:
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Add Service"}
            </button>
        </form>
    );
}

export default ServiceForm;
