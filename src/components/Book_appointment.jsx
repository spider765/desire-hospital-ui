import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";

export default function AppointmentForm() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false); // 1️⃣ Added loading state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        appointment_date: "",
        appointment_time: "",
        doctor_id: "",
        notes: "",
    });

    // 2️⃣ Use Production API URL
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    useEffect(() => {
        fetch(`${API_URL}/doctors`)
            .then((res) => res.json())
            .then((data) => setDoctors(data.doctors || data || []))
            .catch((err) => console.error("Error fetching doctors:", err));
    }, [API_URL]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // 3️⃣ Send to Rails backend (Render)
        fetch(`${API_URL}/appointments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appointment: formData }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to save appointment to database");
                return res.json();
            })
            .then(() => {
                // 4️⃣ Send EmailJS after backend save succeeds
                const selectedDoctor =
                    doctors.find(doc => doc.id.toString() === formData.doctor_id.toString())?.name || "Unknown";

                return emailjs.send(
                    "service_j5p3tlq", // Your Service ID
                    "template_ffthkrd", // Your Template ID
                    {
                        from_name: formData.name,
                        reply_to: formData.email,
                        phone: formData.phone,
                        appointment_date: formData.appointment_date,
                        appointment_time: formData.appointment_time,
                        doctor: selectedDoctor,
                        notes: formData.notes,
                    },
                    "ed3AitMYT32tPJrHC" // Your Public Key
                );
            })
            .then(() => {
                alert("✅ Appointment booked & email sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    appointment_date: "",
                    appointment_time: "",
                    doctor_id: "",
                    notes: "",
                });
            })
            .catch((err) => {
                console.error("Error:", err);
                alert("❌ Appointment failed. Please check your connection and try again.");
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "25px",
                backgroundColor: "#F9F9F9",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            <h2 style={{ marginBottom: "10px", color: "#2E7D32", fontWeight: "600", textAlign: "center" }}>
                Book an Appointment
            </h2>

            <input type="text" name="name" placeholder="Your Name"
                   value={formData.name} onChange={handleChange} required style={inputStyle} />

            <input type="email" name="email" placeholder="Your Email"
                   value={formData.email} onChange={handleChange} required style={inputStyle} />

            <input type="tel" name="phone" placeholder="Phone Number"
                   value={formData.phone} onChange={handleChange} required style={inputStyle} />

            <div style={{ display: "flex", gap: "10px" }}>
                <input type="date" name="appointment_date"
                       value={formData.appointment_date} onChange={handleChange} required style={{ ...inputStyle, flex: 1 }} />

                <input type="time" name="appointment_time"
                       value={formData.appointment_time} onChange={handleChange} required style={{ ...inputStyle, flex: 1 }} />
            </div>

            <select name="doctor_id" value={formData.doctor_id}
                    onChange={handleChange} required style={inputStyle}>
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.name} — {doctor.specialty}
                    </option>
                ))}
            </select>

            <textarea name="notes" placeholder="Additional Notes (Optional)"
                      value={formData.notes} onChange={handleChange}
                      style={{ ...inputStyle, minHeight: "80px" }} />

            <button type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? "#ccc" : "#2E7D32",
                        color: "white",
                        padding: "12px",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "background-color 0.3s ease",
                    }}>
                {loading ? "Processing..." : "Confirm Appointment"}
            </button>
        </form>
    );
}

const inputStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    fontSize: "15px",
    transition: "border-color 0.2s",
    backgroundColor: "white",
};