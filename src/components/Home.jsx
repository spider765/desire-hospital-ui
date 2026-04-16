import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/home.css';

// Base API configuration
const API_BASE_URL = 'https://desire-specialist-hospital.onrender.com';

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

    useEffect(() => {
        axios.get(`${API_BASE_URL}/services`)
            .then(res => {
                if (res.data?.services && Array.isArray(res.data.services)) {
                    setServices(res.data.services);
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
                setServices([]);
            });


        // Fetch Doctors
        axios.get(`${API_BASE_URL}/doctors`)
            .then(res => {
                if (res.data?.doctors && Array.isArray(res.data.doctors)) {
                    setDoctors(res.data.doctors);
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
                setDoctors([]);
            });
    }, []);

    // ... [rest of your component code remains the same]

    // Loading skeleton for services
    const renderServiceSkeletons = () => {
        return Array(6).fill(0).map((_, index) => (
            <div key={index} className="col-12 col-md-6">
                <div
                    className="rounded shadow-sm p-3 d-flex align-items-start flex-wrap"
                    style={{ backgroundColor: '#e0e0e0', flex: '1 1 auto' }}
                >
                    {/* Image placeholder */}
                    <div className="me-3 flex-shrink-0">
                        <div
                            className="rounded"
                            style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: '#f5f5f5'
                            }}
                        ></div>
                    </div>

                    {/* Text placeholders */}
                    <div className="text-start flex-grow-1">
                        {/* Title placeholder */}
                        <h5 className="mb-2">
                            <div
                                className="placeholder"
                                style={{
                                    height: '20px',
                                    width: '60%',
                                    backgroundColor: '#bdbdbd'
                                }}
                            ></div>
                        </h5>

                        {/* Description placeholder */}
                        <p className="mb-0">
                        <span
                            className="placeholder"
                            style={{
                                height: '16px',
                                width: '100%',
                                backgroundColor: '#bdbdbd'
                            }}
                        ></span>
                        </p>
                    </div>
                </div>
            </div>
        ));
    };



    // Loading skeleton for doctors
    const renderDoctorSkeletons = () => {
        return Array(3).fill(0).map((_, index) => (
            <div className="col-12 col-md-4" key={index}>
                <div className="card h-100 overflow-hidden rounded-5 shadow-lg" style={{ backgroundColor: '#e0e0e0', minHeight: '400px' }}>
                    <div className="d-flex flex-column h-100 p-4">
                        <div className="mt-auto mb-4">
                            <div className="placeholder" style={{ height: '24px', width: '80%', backgroundColor: '#bdbdbd' }}></div>
                        </div>
                        <div className="mb-4">
                            <div className="placeholder" style={{ height: '20px', width: '60%', backgroundColor: '#bdbdbd' }}></div>
                        </div>
                        <div className="d-flex list-unstyled mt-auto">
                            <div className="me-auto">
                                <div className="rounded-circle" style={{ width: '32px', height: '32px', backgroundColor: '#bdbdbd' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="p-6">
            {/* Welcome Section */}
            <section className="py-5 bg-light Container1">
                <div className="container">
                    <h1 className="display-5 fw-bold text-center mb-5" style={{ color: '#2E7D32' }}>
                        Welcome to DÉSÍRE Specialist Hospital
                    </h1>

                    <div className="d-flex flex-column flex-md-row align-items-center">
                        {/* Text Section */}
                        <div className="text-center text-md-start flex-fill pe-md-5 content-left">
                            <p className="lead mt-3 mb-4" style={{ color: '#757575' }}>
                                At DÉSÍRE Specialist Hospital, we believe that quality healthcare begins with compassion,
                                expertise, and trust. We are a multi-specialist hospital dedicated to providing exceptional
                                care in orthopedics, trauma, internal medicine, and more.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#212121' }}>
                                Whether you're a first-time visitor or returning patient, we're honored to be your partner in health.
                                <br />
                                <strong>Your care. Our commitment. Always.</strong>
                            </p>
                            <div className="call-action mt-4">
                                <a href="/Book" className="buttonapp">Book Appointment</a>
                                <a href="/Contact" className="buttoncon">Contact us</a>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex-fill content-right d-flex justify-content-center mt-4 mt-md-0">
                            <div className="image-square">
                            <img
  src={`${window.location.origin}/images/hospital_building.jpg`}
  alt="Hospital"
/>                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-5 about-us-section Container1" style={{ backgroundColor: '#F9F9F9' }}>
                <div className="container">
                    <h2 className="mb-4 fw-semibold text-center" style={{ fontSize: '1.75rem', color: '#2E7D32' }}>
                        About Us
                    </h2>
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0 image-square">
                            <img
                                src="/images/about.jpg"
                                alt="About DÉSÍRE Specialist Hospital"
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                        <div className="col-md-6">
                            <p className="lead" style={{ color: '#555' }}>
                                DÉSÍRE Specialist Hospital is a multi-specialty healthcare facility committed to delivering exceptional medical care with compassion, precision, and professionalism.
                            </p>
                            <p style={{ color: '#757575' }}>
                                Our team of experienced doctors, nurses, and support staff work together to ensure that every patient receives personalized treatment in a safe and comfortable environment.
                                From routine checkups to complex surgeries, we are here to serve your health needs 24/7.
                            </p>
                            <a
                                href="/About"
                                className="btn fw-medium mt-3"
                                style={{
                                    backgroundColor: '#2E7D32',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    padding: '8px 16px',
                                    fontWeight: '500'
                                }}
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            {/* Services Section */}
            <section className="mb-5 services-container">
                <div className="container text-center text-white">
                    {/* Section Header */}
                    <h2
                        className="mb-4 fw-semibold"
                        style={{ fontSize: "1.75rem", color: "#2E7D32" }}
                    >
                        Our Services
                    </h2>

                    {/* Error Message */}
                    {error.services && (
                        <div className="alert alert-warning">{error.services}</div>
                    )}

                    {/* Services List (limit to 6) */}
                    <div className="row g-4">
                        {loading.services ? (
                            renderServiceSkeletons()
                        ) : services.length > 0 ? (
                            services.slice(0, 6).map((service, index) => ( // 👈 limited to 6
                                <div key={index} className="col-12 col-md-6">
                                    <div
                                        className="rounded shadow-sm p-3 d-flex align-items-start service-card flex-wrap"
                                        style={{
                                            backgroundColor: "#2E7D32",
                                            color: "#212121",
                                            minHeight: "auto",
                                            flex: "1 1 auto",
                                        }}
                                    >
                                        {/* Service Image */}
                                        <div className="me-3 flex-shrink-0">
                                            <img
                                                src={service.image_url || "/images/default_service.png"}
                                                alt={service.name}
                                                className="rounded"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                    backgroundColor: "white",
                                                    padding: "8px",
                                                }}
                                            />
                                        </div>

                                        {/* Service Text */}
                                        <div className="text-start flex-grow-1">
                                            <h4 className="mb-1 d-flex align-items-center flex-wrap">
                                                <i
                                                    className={`bi ${service.image_url ? "" : "bi-heart"} me-2`}
                                                    style={{ fontSize: "1.4rem", color: "#212121" }}
                                                ></i>
                                                {service.name}
                                            </h4>
                                            <h5
                                                className="mb-0 fw-semibold"
                                                style={{ fontSize: "0.95rem", wordBreak: "break-word" }}
                                            >
                                                {service.title || "Professional healthcare service"}
                                            </h5>
                                            <p
                                                className="mb-0 fw-semibold"
                                                style={{ fontSize: "0.95rem", wordBreak: "break-word" }}
                                            >
                                                {service.text || "Professional healthcare service"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </div>

                    {/* See More Button */}
                    <div className="mt-4 d-flex justify-content-end">
                        <a
                            href="/Services"
                            className="btn fw-medium"
                            style={{
                                backgroundColor: "#2E7D32",
                                color: "#F9F9F9",
                                borderRadius: "6px",
                                padding: "8px 16px",
                                fontWeight: "500",
                            }}
                        >
                            See more
                        </a>
                    </div>
                </div>
            </section>


            {/* Doctors Section */}
            <section className="py-5 doctors-section" style={{ backgroundColor: '#F9F9F9' }}>
                <div className="container">
                    <h2 className="mb-4 fw-semibold" style={{ fontSize: '1.5rem', color: '#2E7D32' }}>
                        Our Doctors
                    </h2>

                    {error.doctors && (
                        <div className="alert alert-warning">
                            {error.doctors}
                        </div>
                    )}

                    <div className="row g-4 mb-4">
                        {loading.doctors ? renderDoctorSkeletons() : (
                            doctors.length > 0 ? (
                                doctors.slice(0, 4).map((doctor, index) => (
                                    <div className="col-12 col-md-4" key={index}>
                                        <div
                                            className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg doctor-card"
                                            style={{
                                                backgroundImage: `url(${doctor.image_url || '/images/default_doctor.jpg'})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundColor: '#2E7D32',
                                                minHeight: '400px',
                                            }}
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


                                                <ul className="d-flex list-unstyled mt-auto card-drinfo">
                                                    <li className="me-auto">
                                                        <img
                                                            src="/images/hospital7.png"
                                                            alt="Hospital Logo"
                                                            width="32"
                                                            height="32"
                                                            className="rounded-circle border border-white"
                                                        />
                                                    </li>
                                                    <li className="d-flex align-items-center me-3" style={{ color: '#2E7D32' }}>
                                                       <b> <small>Desire Specialist Hospital</small></b>
                                                    </li>
                                                    <li className="d-flex align-items-center" style={{ color: '#2E7D32' }}>
                                                        <b> <small>Staff</small></b>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : null // Don't show "No doctors" message if there was an error
                        )}
                    </div>

                    <div className="d-flex justify-content-end">
                        <a href="/Doctors" className="btn fw-medium" style={{
                            backgroundColor: '#2E7D32',
                            color: '#F9F9F9',
                            borderRadius: '6px',
                            padding: '8px 16px',
                            fontWeight: '500'
                        }}>
                            See all doctors
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}