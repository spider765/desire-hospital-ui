import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";

export default function AppointmentForm() {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        appointment_date: "",
        appointment_time: "",
        doctor_id: "",
        notes: "",
    });

    useEffect(() => {
        fetch("https://desire-specialist-hospital.onrender.com/doctors")
            .then((res) => res.json())
            .then((data) => setDoctors(data.doctors || []))
            .catch((err) => console.error("Error fetching doctors:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1️⃣ Send to Rails backend first
        fetch("https://desire-specialist-hospital.onrender.com/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appointment: formData }),
        })
            .then((res) => res.json())
            .then(() => {
                // 2️⃣ Send EmailJS after backend save succeeds
                const selectedDoctor =
                    doctors.find(doc => doc.id.toString() === formData.doctor_id)?.name || "Unknown";

                return emailjs.send(
                    "service_j5p3tlq",
                    "template_ffthkrd",
                    {
                        from_name: formData.name,
                        reply_to: formData.email,
                        phone: formData.phone,
                        appointment_date: formData.appointment_date,
                        appointment_time: formData.appointment_time,
                        doctor: selectedDoctor,
                        notes: formData.notes,
                    },
                    "ed3AitMYT32tPJrHC"
                );
            })
            .then(() => {
                alert("✅ Appointment booked & email sent!");
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
                alert("❌ Something went wrong. Please try again.");
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
            <h2 style={{
                marginBottom: "10px",
                color: "#2E7D32",
                fontWeight: "600",
                textAlign: "center",
            }}>
                Book an Appointment
            </h2>

            <input type="text" name="name" placeholder="Your Name"
                   value={formData.name} onChange={handleChange} required style={inputStyle} />

            <input type="email" name="email" placeholder="Your Email"
                   value={formData.email} onChange={handleChange} required style={inputStyle} />

            <input type="tel" name="phone" placeholder="Phone Number"
                   value={formData.phone} onChange={handleChange} required style={inputStyle} />

            <input type="date" name="appointment_date"
                   value={formData.appointment_date} onChange={handleChange} required style={inputStyle} />

            <input type="time" name="appointment_time"
                   value={formData.appointment_time} onChange={handleChange} required style={inputStyle} />

            <select name="doctor_id" value={formData.doctor_id}
                    onChange={handleChange} required style={inputStyle}>
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.name} — {doctor.specialty}
                    </option>
                ))}
            </select>

            <textarea name="notes" placeholder="Additional Notes"
                      value={formData.notes} onChange={handleChange}
                      style={{ ...inputStyle, minHeight: "80px" }} />

            <button type="submit"
                    style={{
                        backgroundColor: "#2E7D32",
                        color: "white",
                        padding: "12px",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#256428"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#2E7D32"}>
                Book Appointment
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
