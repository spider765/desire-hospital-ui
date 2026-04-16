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

    // Fetch doctors
    useEffect(() => {
        fetch("https://desire-specialist-hospital.onrender.com/doctors")
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data.doctors || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching doctors:", err);
                setError("Failed to load doctors.");
                setLoading(false);
            });
    }, []);

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

    // Mouse drag scroll
    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    // Prev & Next button handlers
    const scrollPrev = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollNext = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    if (loading) return <p>Loading doctors...</p>;
    if (error) return <div className="alert alert-warning">{error}</div>;
    if (doctors.length === 0) return <p>No doctors available at the moment.</p>;

    return (
        <section className="py-5 doctors-section" style={{ backgroundColor: '#F9F9F9' }}>
            <div className="container cotainer4">
                <h2 className="mb-4 fw-semibold" style={{ fontSize: '1.8rem', color: '#2E7D32' }}>
                    Meet our medical staff
                </h2>



                {/* Scrollable container */}
                <div
                    ref={scrollContainerRef}
                    className="doctor-scroll-container card-background"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'hidden',
                        cursor: isDragging.current ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        paddingBottom: '10px',
                        backgroundColor: '#F9F9F9',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {doctors.map((doctor, index) => (
                        <div
                            key={index}
                            className="card card-cover overflow-hidden text-white rounded-5 shadow-lg doctor-card"
                            style={{
                                backgroundImage: `url(${doctor.image_url || '/images/default_doctor.jpg'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',


                                minHeight: '620px',
                                flex: '0 0 300px',
                                transition: 'transform 0.3s ease',
                            }}
                            onMouseEnter={() => setActiveDoctor(index)}
                            onClick={() => setActiveDoctor(activeDoctor === index ? null : index)}
                        >
                            <div
                                className="d-flex flex-column h-100 p-4 text-shadow-1"

                            >
                                <h2 className="mt-auto mb-2 fs-4 fw-bold" style={{ color: '#2E7D32' }}>
                                    {doctor.name}
                                </h2>
                                <p className="mb-3 fw-semibold fs-6" style={{ color: '#2E7D32' }}>
                                    {doctor.specialty}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Prev and Next buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} className="prev">
                    <button onClick={scrollPrev} style={navBtnStyle}>Prev</button>
                    <button onClick={scrollNext} style={navBtnStyle}>Next</button>
                </div>
                {/* Description area */}
                {activeDoctor !== null && (
                    <div
                        style={{
                            marginTop: '20px',
                            background: '#F9F9F9',
                            border: '1px solid #2E7D32',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h5>{doctors[activeDoctor].name}</h5>
                        <p>{doctors[activeDoctor].description || "No description available for this doctor."}</p>
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
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
};
