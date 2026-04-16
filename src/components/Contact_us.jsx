import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        body: "",
    });

    const [loading, setLoading] = useState(false);

    // Use environment variable for production, fallback to localhost for dev
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1️⃣ Save to Rails backend
            const backendRes = await fetch(`${API_URL}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: formData }),
            });

            if (!backendRes.ok) {
                throw new Error("Failed to save message to backend");
            }

            // 2️⃣ Send via EmailJS
            await emailjs.send(
                "service_j5p3tlq",
                "template_tcs49wb",
                {
                    from_name: formData.name,
                    reply_to: formData.email,
                    message: formData.body,
                },
                "ed3AitMYT32tPJrHC"
            );

            alert("✅ Message sent successfully!");
            setFormData({ name: "", email: "", body: "" });
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: "20px" }}>
            <h1 style={{ textAlign: "center", color: "#2E7D32", fontWeight: "700" }}>
                Contact Us
            </h1>
            <p style={{ textAlign: "center", color: "#555", maxWidth: "600px", margin: "0 auto 30px" }}>
                We’d love to hear from you! Please fill out the form below or use our contact
                details to reach us directly.
            </p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                alignItems: "start"
            }}>
                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        padding: "25px",
                        backgroundColor: "#F9F9F9",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <textarea
                        name="body"
                        placeholder="Your Message"
                        value={formData.body}
                        onChange={handleChange}
                        required
                        rows="5"
                        style={{ ...inputStyle, minHeight: "100px" }}
                    ></textarea>
                    <button
                        type="submit"
                        disabled={loading}
                        style={buttonStyle(loading)}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

                {/* Contact Info */}
                <div style={{ padding: "10px" }}>
                    <h3 style={{ color: "#2E7D32" }}>Our Contact Details</h3>
                    <p><strong>Phone:</strong> <a href="tel:+2349044444811">+2349044444811</a></p>
                    {/* Fixed Email Link: Added mailto: */}
                    <p><strong>Email:</strong> <a href="mailto:desirespecialisthospital@gmail.com">desirespecialisthospital@gmail.com</a></p>
                    <p><strong>Address:</strong> 93 Adeoyo-Oje Road, Yemetu St, Ibadan 200284, Oyo</p>

                    <h4 style={{ marginTop: "20px", color: "#2E7D32" }}>Business Hours</h4>
                    <p>Monday – Sunday: 24/7</p>

                    <h4 style={{ marginTop: "20px", color: "#2E7D32" }}>Follow Us</h4>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {/* Fixed Links: Changed # to javascript:void(0) to satisfy ESLint */}
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div style={{ marginTop: "30px", overflow: "hidden", borderRadius: "12px" }}>
                <iframe
                    title="Desire Specialist Hospital Location" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.46743389456!2d3.8967!3d7.3989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjMnNTYuMCJOIDPCsDUzJzQ4LjEiRQ!5e0!3m2!1sen!2sng!4v1620000000000"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
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
    opacity: loading ? 0.7 : 1
});