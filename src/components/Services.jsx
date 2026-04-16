import React, { useEffect, useState, useRef } from 'react';
import './css/home.css';
import './css/services.css';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeService, setActiveService] = useState(null);
    const scrollContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // 1️⃣ Use the global API URL
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    useEffect(() => {
        // 2️⃣ Fetch from the dynamic URL
        fetch(`${API_URL}/services`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch services");
                return res.json();
            })
            .then(data => {
                setServices(data.services || data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching services:", err);
                setError("Failed to load services.");
                setLoading(false);
            });
    }, [API_URL]);

    useEffect(() => {
        if (services.length > 1) {
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
    }, [services]);

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

    if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading services...</p>;
    if (error) return <div className="container mt-4"><div className="alert alert-warning">{error}</div></div>;
    if (services.length === 0) return <p style={{ textAlign: 'center', padding: '50px' }}>No services available at the moment.</p>;

    return (
        <section className="py-5 services-section" style={{ backgroundColor: '#F9F9F9' }}>
            <div className="container">
                <h2 className="mb-4 fw-semibold" style={{ fontSize: '1.8rem', color: '#2E7D32' }}>
                    Our Services
                </h2>

                <div
                    ref={scrollContainerRef}
                    className="services-scroll-container"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'hidden',
                        cursor: isDragging.current ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        paddingBottom: '10px'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {services.map((service, index) => (
                        <div
                            key={service.id || index}
                            className="rounded shadow-sm p-3 d-flex align-items-start service-card flex-wrap"
                            style={{
                                backgroundColor: '#2E7D32',
                                color: '#212121',
                                flex: '0 0 500px',
                                minHeight: 'auto',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease'
                            }}
                            onClick={() => setActiveService(activeService === index ? null : index)}
                        >
                            <div className="me-3 flex-shrink-0">
                                <img
                                    src={service.logo_url || '/images/default_service.png'}
                                    alt={service.name}
                                    className="rounded"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        backgroundColor: 'white',
                                        padding: '8px',
                                        borderRadius: '8px',
                                    }}
                                />
                            </div>

                            <div className="text-start flex-grow-1">
                                <h4 className="mb-1" style={{ color: '#FFFFFF' }}>{service.name}</h4>
                                <b><h5 className="fw-semibold" style={{ color: '#E0E0E0' }}>{service.title || "Professional healthcare service"}</h5></b>
                                <p className="fw-semibold mb-0" style={{ color: '#BDBDBD' }}>{service.text || "Quality medical care you can trust."}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <button type="button" onClick={scrollPrev} style={navBtnStyle}>Prev</button>
                    <button type="button" onClick={scrollNext} style={navBtnStyle}>Next</button>
                </div>

                {activeService !== null && services[activeService] && (
                    <div
                        style={{
                            marginTop: '20px',
                            background: '#F9F9F9',
                            border: '1px solid #2E7D32',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            color: '#212121',
                            textAlign: 'left'
                        }}
                    >
                        <h5 style={{ color: '#2E7D32' }}>
                            {services[activeService].name}
                        </h5>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '15px'
                        }}>
                            <div style={{
                                flex: '1 1 50%',
                                minWidth: '250px'
                            }}>
                                <p style={{ margin: 0 }}>
                                    {services[activeService].description || "No description available for this service."}
                                </p>
                            </div>

                            <div style={{
                                flex: '1 1 50%',
                                minWidth: '250px'
                            }}>
                                <img
                                    src={services[activeService].image_url || '/images/default_service.png'}
                                    alt={services[activeService].name}
                                    className="rounded"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '300px',
                                        objectFit: 'cover',
                                        backgroundColor: 'white',
                                        borderRadius: '8px'
                                    }}
                                />
                            </div>
                        </div>
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