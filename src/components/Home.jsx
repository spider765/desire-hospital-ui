import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/home.css';

const API_BASE_URL = 'https://desire-specialist-hospital.onrender.com';

export default function Home() {
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState({ services: true, doctors: true });
    const [error, setError] = useState({ services: null, doctors: null });

    useEffect(() => {
        axios.get(`${API_BASE_URL}/services`)
            .then(res => {
                setServices(Array.isArray(res.data?.services) ? res.data.services : []);
                setLoading(prev => ({ ...prev, services: false }));
            })
            .catch(() => {
                setError(prev => ({ ...prev, services: "Service information currently unavailable" }));
                setLoading(prev => ({ ...prev, services: false }));
            });

        axios.get(`${API_BASE_URL}/doctors`)
            .then(res => {
                setDoctors(Array.isArray(res.data?.doctors) ? res.data.doctors : []);
                setLoading(prev => ({ ...prev, doctors: false }));
            })
            .catch(() => {
                setError(prev => ({ ...prev, doctors: "Doctor information currently unavailable" }));
                setLoading(prev => ({ ...prev, doctors: false }));
            });
    }, []);

    const renderServiceSkeletons = () =>
        Array(6).fill(0).map((_, i) => (
            <div key={i} className="col-12 col-md-6">
                <div className="rounded shadow-sm p-3 d-flex align-items-start flex-wrap" style={{ backgroundColor: '#e0e0e0' }}>
                    <div className="me-3 flex-shrink-0">
                        <div className="rounded" style={{ width: '80px', height: '80px', backgroundColor: '#f5f5f5' }}></div>
                    </div>
                    <div className="text-start flex-grow-1">
                        <div className="placeholder" style={{ height: '20px', width: '60%', backgroundColor: '#bdbdbd', display: 'block', marginBottom: '8px' }}></div>
                        <div className="placeholder" style={{ height: '16px', width: '100%', backgroundColor: '#bdbdbd', display: 'block' }}></div>
                    </div>
                </div>
            </div>
        ));

    const renderDoctorSkeletons = () =>
        Array(3).fill(0).map((_, i) => (
            <div className="col-12 col-md-4" key={i}>
                <div className="card h-100 overflow-hidden rounded-5 shadow-lg" style={{ backgroundColor: '#e0e0e0', minHeight: '400px' }}>
                    <div className="d-flex flex-column h-100 p-4">
                        <div className="mt-auto mb-4">
                            <div className="placeholder" style={{ height: '24px', width: '80%', backgroundColor: '#bdbdbd', display: 'block' }}></div>
                        </div>
                        <div className="mb-4">
                            <div className="placeholder" style={{ height: '20px', width: '60%', backgroundColor: '#bdbdbd', display: 'block' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="p-6">

            {/* Welcome Section */}
            <section className="py-5 bg-light Container1">
                <div className="container">
                    <h1 className="display-5 fw-bold text-center mb-5" style={{ color: '#2E7D32' }}>
                        Welcome to DÉSÍRE Specialist Hospital
                    </h1>
                    <div className="d-flex flex-column flex-md-row align-items-center">
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
                                <a href="/book" className="buttonapp">Book Appointment</a>
                                <a href="/contact" className="buttoncon">Contact us</a>
                            </div>
                        </div>
                        <div className="flex-fill content-right d-flex justify-content-center mt-4 mt-md-0">
                            <div className="image-square">
                                <img src="/images/hospital_building.jpg" alt="Hospital" />
                            </div>
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
                                DÉSÍRE Specialist Hospital is a multi-specialty healthcare facility committed to delivering
                                exceptional medical care with compassion, precision, and professionalism.
                            </p>
                            <p style={{ color: '#757575' }}>
                                Our team of experienced doctors, nurses, and support staff work together to ensure that every
                                patient receives personalized treatment in a safe and comfortable environment.
                                From routine checkups to complex surgeries, we are here to serve your health needs 24/7.
                            </p>
                            <a href="/about" className="btn fw-medium mt-3"
                                style={{ backgroundColor: '#2E7D32', color: '#fff', borderRadius: '6px', padding: '8px 16px' }}>
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="mb-5 services-container">
                <div className="container text-center">
                    <h2 className="mb-4 fw-semibold" style={{ fontSize: '1.75rem', color: '#2E7D32' }}>
                        Our Services
                    </h2>
                    {error.services && <div className="alert alert-warning">{error.services}</div>}
                    <div className="row g-4">
                        {loading.services ? renderServiceSkeletons() : (
                            services.slice(0, 6).map((service, index) => (
                                <div key={index} className="col-12 col-md-6">
                                    <div className="rounded shadow-sm p-3 d-flex align-items-start service-card flex-wrap"
                                        style={{ backgroundColor: '#2E7D32', color: '#212121' }}>
                                        <div className="me-3 flex-shrink-0">
                                            <img
                                                src={service.image_url || '/images/default_service.png'}
                                                alt={service.name}
                                                className="rounded"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', backgroundColor: 'white', padding: '8px' }}
                                            />
                                        </div>
                                        <div className="text-start flex-grow-1">
                                            <h4 className="mb-1" style={{ color: '#fff' }}>{service.name}</h4>
                                            <p className="mb-0 fw-semibold" style={{ fontSize: '0.95rem', color: '#e0e0e0' }}>
                                                {service.title || service.text || 'Professional healthcare service'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mt-4 d-flex justify-content-end">
                        <a href="/services" className="btn fw-medium"
                            style={{ backgroundColor: '#2E7D32', color: '#F9F9F9', borderRadius: '6px', padding: '8px 16px' }}>
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
                    {error.doctors && <div className="alert alert-warning">{error.doctors}</div>}
                    <div className="row g-4 mb-4">
                        {loading.doctors ? renderDoctorSkeletons() : (
                            doctors.slice(0, 4).map((doctor, index) => (
                                <div className="col-12 col-md-4" key={index}>
                                    <div className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg doctor-card"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${doctor.image_url || '/images/default_doctor.jpg'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            minHeight: '400px',
                                        }}>
                                        <div className="d-flex flex-column h-100 p-4">
                                            <h2 className="mt-auto mb-2 fs-4 fw-bold" style={{ color: '#fff' }}>
                                                {doctor.name}
                                            </h2>
                                            <p className="mb-3 fw-semibold fs-6" style={{ color: '#f0f0f0' }}>
                                                {doctor.specialty}
                                            </p>
                                            <ul className="d-flex list-unstyled mt-auto card-drinfo">
                                                <li className="me-auto">
                                                    <img src="/images/hospital7.png" alt="Logo" width="32" height="32"
                                                        className="rounded-circle border border-white" />
                                                </li>
                                                <li className="d-flex align-items-center me-3" style={{ color: '#fff' }}>
                                                    <b><small>Desire Specialist Hospital</small></b>
                                                </li>
                                                <li className="d-flex align-items-center" style={{ color: '#fff' }}>
                                                    <b><small>Staff</small></b>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="d-flex justify-content-end">
                        <a href="/doctors" className="btn fw-medium"
                            style={{ backgroundColor: '#2E7D32', color: '#F9F9F9', borderRadius: '6px', padding: '8px 16px' }}>
                            See all doctors
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}