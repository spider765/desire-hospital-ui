import React, { useEffect, useState, useRef } from 'react';
import './css/home.css';
import './css/doctors.css';

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeDoctor, setActiveDoctor] = useState(null);
    const scrollContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // 1️⃣ Define the Production API URL
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    // Fetch doctors
    useEffect(() => {
        // 2️⃣ Use the absolute URL
        fetch(`${API_URL}/doctors`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch doctors");
                return res.json();
            })
            .then((data) => {
                // Handle both { doctors: [] } and direct array responses
                setDoctors(data.doctors || data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching doctors:", err);
                setError("Failed to load doctors.");
                setLoading(false);
            });
    }, [API_URL]);

    // Auto-scroll loop
    useEffect(() => {
        if (doctors.length > 1) {
            const interval = setInterval(() => {
                if (scrollContainerRef.current && !isDragging.current) {
                    const container = scrollContainerRef.current;
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    if (container.scrollLeft >= maxScroll) {
                        container.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        container.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                }
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [doctors]);

    // Mouse drag scroll handlers (keep your existing logic)
    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };
    const handleMouseLeave = () => { isDragging.current = false; };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const scrollPrev = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };
    const scrollNext = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading our specialists...</p>;
    if (error) return <div className="container mt-4"><div className="alert alert-warning">{error}</div></div>;
    if (doctors.length === 0) return <p style={{ textAlign: 'center', padding: '50px' }}>No doctors available at the moment.</p>;

    return (
        <section className="py-5 doctors-section" style={{ backgroundColor: '#F9F9F9' }}>
            <div className="container cotainer4">
                <h2 className="mb-4 fw-semibold" style={{ fontSize: '1.8rem', color: '#2E7D32' }}>
                    Meet our medical staff
                </h2>

                <div
                    ref={scrollContainerRef}
                    className="doctor-scroll-container card-background"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'hidden',
                        cursor: isDragging.current ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        paddingBottom: '20px',
                        backgroundColor: '#F9F9F9',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {doctors.map((doctor, index) => (
                        <div
                            key={doctor.id || index}
                            className="card card-cover overflow-hidden text-white rounded-5 shadow-lg doctor-card"
                            style={{
                                // Use a linear gradient overlay so text is ALWAYS readable
                                backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.8)), url(${doctor.image_url || '/images/default_doctor.jpg'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                                minHeight: '500px',
                                flex: '0 0 300px',
                                transition: 'transform 0.3s ease',
                                border: 'none'
                            }}
                            onMouseEnter={() => setActiveDoctor(index)}
                            onClick={() => setActiveDoctor(activeDoctor === index ? null : index)}
                        >
                            <div className="d-flex flex-column h-100 p-4">
                                <h2 className="mt-auto mb-2 fs-4 fw-bold" style={{ color: '#2E7D32', textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
                                    {doctor.name}
                                </h2>
                                <p className="mb-3 fw-bold fs-6" style={{ color: '#1B5E20' }}>
                                    {doctor.specialty}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} className="prev">
                    <button type="button" onClick={scrollPrev} style={navBtnStyle}>Prev</button>
                    <button type="button" onClick={scrollNext} style={navBtnStyle}>Next</button>
                </div>

                {activeDoctor !== null && doctors[activeDoctor] && (
                    <div
                        style={{
                            marginTop: '20px',
                            background: '#FFFFFF',
                            border: '2px solid #2E7D32',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h5 style={{ color: '#2E7D32', fontWeight: 'bold' }}>{doctors[activeDoctor].name}</h5>
                        <p style={{ color: '#444', lineHeight: '1.6' }}>
                            {doctors[activeDoctor].description || "No description available for this doctor."}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

const navBtnStyle = {
    backgroundColor: '#2E7D32',
    color: '#F9F9F9',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
};