import React, { useEffect, useState, useRef } from 'react';

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    // Fetch doctors
    useEffect(() => {
        fetch("https://desire-specialist-hospital.onrender.com/doctors")
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data.doctors || []);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load doctors.");
                setLoading(false);
            });
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("specialty", specialty);
        formData.append("description", description);
        if (image) {
            formData.append("image", image); // Rails will map to `has_one_attached :image`
        }

        const res = await fetch("https://desire-specialist-hospital.onrender.com/doctors", {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            const newDoctor = await res.json();
            setDoctors((prev) => [...prev, newDoctor]);
            setName("");
            setSpecialty("");
            setDescription("");
            setImage(null);
        } else {
            console.error("Failed to add doctor");
        }
    };

    return (
        <section style={{ padding: '20px' }}>
            <h2>Add a Doctor</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Doctor Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                />
                <button type="submit">Add Doctor</button>
            </form>

            {/* Existing Doctors List */}
            {loading ? (
                <p>Loading doctors...</p>
            ) : (
                <div>
                    {doctors.map((doc) => (
                        <div key={doc.id}>
                            <h3>{doc.name}</h3>
                            <p>{doc.specialty}</p>
                            {doc.image_url && (
                                <img src={doc.image_url} alt={doc.name} style={{ width: "150px" }} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
