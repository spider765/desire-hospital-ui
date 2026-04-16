import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/home.css';

export default function Home() {
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState({
        services: true,
        doctors: true
    });
    const [error, setError] = useState({
        services: null,
        doctors: null
    });

    // 1️⃣ Global API URL logic
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    useEffect(() => {
        // Fetch Services from Production
        axios.get(`${API_URL}/services`)
            .then(res => {
                // Handling both potential Rails response formats
                const serviceData = res.data?.services || res.data;
                if (Array.isArray(serviceData)) {
                    setServices(serviceData);
                } else {
                    console.warn("Unexpected services data format:", res.data);
                    setServices([]);
                }
                setLoading(prev => ({ ...prev, services: false }));
            })
            .catch(err => {
                console.error("Failed to fetch services", err);
                setError(prev => ({ ...prev, services: "Service information currently unavailable" }));
                setLoading(prev => ({ ...prev, services: false }));
            });

        // Fetch Doctors from Production
        axios.get(`${API_URL}/doctors`)
            .then(res => {
                const doctorData = res.data?.doctors || res.data;
                if (Array.isArray(doctorData)) {
                    setDoctors(doctorData);
                } else {
                    console.warn("Unexpected doctors data format:", res.data);
                    setDoctors([]);
                }
                setLoading(prev => ({ ...prev, doctors: false }));
            })
            .catch(err => {
                console.error("Failed to fetch doctors", err);
                setError(prev => ({ ...prev, doctors: "Doctor information currently unavailable" }));
                setLoading(prev => ({ ...prev, doctors: false }));
            });
    }, [API_URL]);

    // ... [Your skeleton render functions remain the same as they don't use the API]
    const renderServiceSkeletons = () => { /* your existing code */ };
    const renderDoctorSkeletons = () => { /* your existing code */ };

    return (
        <div className="p-6">
            {/* Welcome Section */}
            <section className="py-5 bg-light Container1">
                {/* ... rest of your UI code ... */}
                {/* (Keep using the image paths as you had them, they look good) */}
                <img src="/images/about.jpg" alt="About" className="img-fluid rounded shadow-sm" />
            </section>

            {/* Services Section */}
            <section className="mb-5 services-container">
                <div className="container text-center text-white">
                    <h2 className="mb-4 fw-semibold" style={{ fontSize: "1.75rem", color: "#2E7D32" }}>
                        Our Services
                    </h2>

                    {error.services && <div className="alert alert-warning">{error.services}</div>}

                    <div className="row g-4">
                        {loading.services ? (
                            renderServiceSkeletons()
                        ) : services.length > 0 ? (
                            services.slice(0, 6).map((service, index) => (
                                <div key={service.id || index} className="col-12 col-md-6">
                                    <div className="rounded shadow-sm p-3 d-flex align-items-start service-card flex-wrap"
                                        style={{ backgroundColor: "#2E7D32", color: "#212121" }}>
                                        <div className="me-3 flex-shrink-0">
                                            <img
                                                src={service.image_url || "/images/default_service.png"}
                                                alt={service.name}
                                                className="rounded"
                                                style={{ width: "80px", height: "80px", objectFit: "cover", backgroundColor: "white", padding: "8px" }}
                                            />
                                        </div>
                                        <div className="text-start flex-grow-1">
                                            <h4 className="mb-1 d-flex align-items-center flex-wrap" style={{color: '#fff'}}>
                                                {service.name}
                                            </h4>
                                            <p className="mb-0 fw-semibold" style={{ fontSize: "0.95rem", color: '#E0E0E0' }}>
                                                {service.title || "Professional healthcare service"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : <p style={{color: '#2E7D32'}}>Check back later for our list of services.</p>}
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <section className="py-5 doctors-section" style={{ backgroundColor: '#F9F9F9' }}>
                <div className="container">
                    <h2 className="mb-4 fw-semibold" style={{ fontSize: '1.5rem', color: '#2E7D32' }}>
                        Our Doctors
                    </h2>

                    {error.doctors && <div className="alert alert-warning">{error.doctors}</div>}

                    <div className="row g-4 mb-4">
                        {loading.doctors ? renderDoctorSkeletons() : (
                            doctors.length > 0 ? (
                                doctors.slice(0, 3).map((doctor, index) => (
                                    <div className="col-12 col-md-4" key={doctor.id || index}>
                                        <div className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg doctor-card"
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${doctor.image_url || '/images/default_doctor.jpg'})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                minHeight: '400px',
                                            }}>
                                            <div className="d-flex flex-column h-100 p-4 text-shadow-1">
                                                <h2 className="mt-auto mb-2 fs-4 fw-bold" style={{ color: '#fff' }}>
                                                    {doctor.name}
                                                </h2>
                                                <p className="mb-3 fw-semibold fs-6" style={{ color: '#F0F0F0' }}>
                                                    {doctor.specialty}
                                                </p>
                                                {/* Logo footer */}
                                                <ul className="d-flex list-unstyled mt-auto card-drinfo">
                                                    <li className="me-auto">
                                                        <img src="/images/hospital7.png" alt="Logo" width="32" height="32" className="rounded-circle border border-white" />
                                                    </li>
                                                    <li className="d-flex align-items-center me-3" style={{ color: '#fff' }}>
                                                       <b><small>Desire Specialist Hospital</small></b>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : null
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}