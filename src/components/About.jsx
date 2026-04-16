import React from "react";
import './css/about.css';

export default function AboutUs() {
    return (
        <section
            className="py-5 about-us-section Aboutbody"
            style={{
                backgroundColor: "#F9F9F9",
                fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                paddingTop: "60px",
                paddingBottom: "60px"
            }}
        >
            <div className="container" style={{ maxWidth: "1100px" }}>
                {/* Section Title */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2
                        className="fw-semibold"
                        style={{
                            fontSize: "2.5rem",
                            color: "#2E7D32",
                            marginBottom: "10px"
                        }}
                    >
                        About Us
                    </h2>
                    <div
                        style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#2E7D32",
                            margin: "0 auto",
                            borderRadius: "2px"
                        }}
                    ></div>
                </div>

                {/* Main Content Row */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "40px"
                    }}
                >
                    {/* Image Column */}
                    <div className="image-square" style={{ flex: "1 1 450px" }}>
                        <img
                            src="/images/about.jpg"
                            alt="Desire Specialist Hospital Facility"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "20px",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                objectFit: "cover"
                            }}
                        />
                    </div>

                    {/* Text Column */}
                    <div
                        style={{
                            flex: "1 1 450px",
                            color: "#444"
                        }}
                    >
                        <h3 style={{ color: '#2E7D32', marginBottom: '20px', fontSize: '1.5rem' }}>
                            Your Health, Our Commitment. Always.
                        </h3>
                        
                        <p
                            className="lead"
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                marginBottom: "20px",
                                lineHeight: "1.6",
                                color: "#333"
                            }}
                        >
                            <strong>DÉSÍRE Specialist Hospital</strong> is a
                            multi-specialty healthcare facility committed to
                            delivering exceptional medical care with compassion,
                            precision, and professionalism.
                        </p>
                        
                        <p style={paragraphStyle}>
                            Since our founding, we have built a reputation for
                            excellence in medical services, offering everything
                            from routine check-ups to advanced surgical
                            procedures. Our modern facilities are equipped with
                            cutting-edge technology, enabling our healthcare
                            professionals to diagnose and treat with the highest
                            level of accuracy.
                        </p>
                        
                        <p style={paragraphStyle}>
                            We believe that healthcare goes beyond medical
                            treatment—it is about building trust and ensuring
                            comfort. Whether it’s emergency care, maternity
                            services, or chronic disease management, our approach 
                            is patient-first at every step.
                        </p>

                        <div style={{ marginTop: '30px' }}>
                            <a
                                href="/services"
                                style={buttonStyle}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#2E7D32")}
                            >
                                Explore Our Services
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Reusable Styles
const paragraphStyle = {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "15px",
    lineHeight: "1.8"
};

const buttonStyle = {
    display: "inline-block",
    backgroundColor: "#2E7D32",
    color: "#fff",
    borderRadius: "30px", // Rounded pill look for modern UI
    padding: "12px 30px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)"
};