import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/home.css';
import hospitalImg from '../images/hospital_building.jpg';
import aboutImg from '../images/about.jpg';
import hospitalLogo from '../images/hospital7.png';

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
                setError(prev => ({ ...prev, services: 'Service information currently unavailable' }));
                setLoading(prev => ({ ...prev, services: false }));
            });

        axios.get(`${API_BASE_URL}/doctors`)
            .then(res => {
                setDoctors(Array.isArray(res.data?.doctors) ? res.data.doctors : []);
                setLoading(prev => ({ ...prev, doctors: false }));
            })
            .catch(() => {
                setError(prev => ({ ...prev, doctors: 'Doctor information currently unavailable' }));
                setLoading(prev => ({ ...prev, doctors: false }));
            });
    }, []);

    const renderServiceSkeletons = () =>
        Array(6).fill(0).map((_, i) => (
            <div key={i} className="col-12 col-md-6">
                <div className="rounded shadow-sm p-3 d-flex align-items-start flex-wrap" style={{ backgroundColor: '#e0e0e0', minHeight: '100px' }}>
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
        <main className="home-page">

            {/* ── Hero ── */}
            <section className="hero-section">
                <div className="hero-section__inner">
                    <div className="hero-section__text">
                        <span className="hero-section__badge">Specialist Care · Ibadan, Nigeria</span>
                        <h1 className="hero-section__title">
                            Welcome to <span className="hero-section__accent">DÉSÍRE</span><br />Specialist Hospital
                        </h1>
                        <p className="hero-section__sub">
                            At DÉSÍRE Specialist Hospital, we believe quality healthcare begins with compassion,
                            expertise, and trust — delivering exceptional care in orthopedics, trauma, internal
                            medicine, and more.
                        </p>
                        <p className="hero-section__tagline">
                            Your care. Our commitment. <strong>Always.</strong>
                        </p>
                        <div className="hero-section__actions">
                            <a href="/book" className="buttonapp">Book Appointment</a>
                            <a href="/contact" className="buttoncon">Contact Us</a>
                        </div>
                    </div>
                    <div className="hero-section__image-wrap">
                        <img src={hospitalImg} alt="DÉSÍRE Specialist Hospital building" />
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="stats-section">
                <div className="stats-section__grid">
                    {[
                        { value: '10+', label: 'Years of Care' },
                        { value: '20+', label: 'Specialist Doctors' },
                        { value: '5,000+', label: 'Patients Served' },
                        { value: '24/7', label: 'Emergency Support' },
                    ].map((s, i) => (
                        <div className="stat-item" key={i}>
                            <span className="stat-item__value">{s.value}</span>
                            <span className="stat-item__label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── About ── */}
            <section className="about-section">
                <div className="about-section__image-wrap">
                    <img src={aboutImg} alt="About DÉSÍRE Specialist Hospital" />
                </div>
                <div className="about-section__content">
                    <span className="section-eyebrow">Who we are</span>
                    <h2 className="section-heading">Excellence in Healthcare Since Day One</h2>
                    <p>
                        DÉSÍRE Specialist Hospital is a multi-specialty healthcare facility committed to
                        delivering exceptional medical care with compassion, precision, and professionalism.
                    </p>
                    <p>
                        Our experienced team of doctors, nurses, and support staff ensure every patient
                        receives personalized treatment in a safe, comfortable environment — from routine
                        checkups to complex surgeries, 24/7.
                    </p>
                    <a href="/about" className="buttonapp" style={{ marginTop: '1rem', display: 'inline-block' }}>
                        Learn More
                    </a>
                </div>
            </section>

            {/* ── Services ── */}
            <section className="mb-5 services-container">
                <div className="container text-center">
                    <span className="section-eyebrow">What we offer</span>
                    <h2 className="section-heading" style={{ fontSize: '1.75rem', color: '#2E7D32' }}>
                        Our Services
                    </h2>
                    {error.services && <div className="alert alert-warning">{error.services}</div>}
                    <div className="row g-4">
                        {loading.services ? renderServiceSkeletons() : (
                            services.slice(0, 6).map((service, index) => (
                                <div key={index} className="col-12 col-md-6">
    <div className="service-card-modern d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm">
        
        {/* Image */}
        <div className="service-icon">
            <img
                src={service.image_url || hospitalLogo}
                alt={service.name}
            />
        </div>

        {/* Content */}
        <div className="flex-grow-1 text-start">
            <h4 className="service-title mb-1">
                {service.name}
            </h4>

            <p className="service-text mb-0">
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

            {/* ── Doctors ── */}
            <section className="py-5 doctors-section" style={{ backgroundColor: '#F9F9F9' }}>
                <div className="container">
                    <span className="section-eyebrow">Meet the team</span>
                    <h2 className="mb-4 fw-semibold section-heading" style={{ fontSize: '1.5rem', color: '#2E7D32' }}>
                        Our Doctors
                    </h2>
                    {error.doctors && <div className="alert alert-warning">{error.doctors}</div>}
                    <div className="row g-4 mb-4">
                        {loading.doctors ? renderDoctorSkeletons() : (
                            doctors.slice(0, 4).map((doctor, index) => (
                                <div className="col-12 col-md-4" key={index}>
                                    <div
                                        className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg doctor-card"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${doctor.image_url || hospitalLogo})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            minHeight: '400px',
                                        }}
                                    >
                                        <div className="d-flex flex-column h-100 p-4">
                                            <h2 className="mt-auto mb-2 fs-4 fw-bold" style={{ color: '#fff' }}>
                                                {doctor.name}
                                            </h2>
                                            <p className="mb-3 fw-semibold fs-6" style={{ color: '#f0f0f0' }}>
                                                {doctor.specialty}
                                            </p>
                                            <ul className="d-flex list-unstyled mt-auto card-drinfo">
                                                <li className="me-auto">
                                                    <img src={hospitalLogo} alt="Logo" width="32" height="32"
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

            

        </main>
    );
}