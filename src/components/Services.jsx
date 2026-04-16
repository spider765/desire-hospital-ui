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

    useEffect(() => {
        fetch("https://desire-specialist-hospital.onrender.com/services")
            .then(res => res.json())
            .then(data => {
                setServices(data.services || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching services:", err);
                setError("Failed to load services.");
                setLoading(false);
            });
    }, []);

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

    if (loading) return <p>Loading services...</p>;
    if (error) return <div className="alert alert-warning">{error}</div>;
    if (services.length === 0) return <p>No services available at the moment.</p>;

    return (
        <section className="py-5 services-section" style={{ backgroundColor: '#F9F9F9' }}>
            <div className="container">
                <h2 className="mb-4 fw-semibold" style={{ fontSize: '1.8rem', color: '#2E7D32' }}>
                    Our Services
                </h2>

                {/* Scrollable services list */}
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
                            key={index}
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
                            {/* Logo in card */}
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

                            {/* Text content */}
                            <div className="text-start flex-grow-1">
                                <h4 className="mb-1">{service.name}</h4>
                              <b>  <h5 className="fw-semibold">{service.title || "Professional healthcare service"}</h5></b>
                                <p className="fw-semibold mb-0" style={{ color: 'silver',
                                    }} >{service.text || "Quality medical care you can trust."}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Prev & Next buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <button onClick={scrollPrev} style={navBtnStyle}>Prev</button>
                    <button onClick={scrollNext} style={navBtnStyle}>Next</button>
                </div>

                {/* Description outside the cards */}
                {activeService !== null && (
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

                        {/* 50/50 split container */}
                        <div style={{
                            display: 'flex',
                            // allows wrapping under image
                            gap: '15px'
                        }}>
                            {/* Text Side */}
                            <div style={{
                                flex: '1 1 50%',
                                minWidth: '250px'
                            }}>
                                <p style={{ margin: 0 }}>
                                    {services[activeService].description || "No description available for this service."}
                                </p>
                            </div>

                            {/* Image Side */}
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
