import React from "react";
import './css/about.css';
export default function AboutUs() {
    return (
        <section
            className="py-5 about-us-section Aboutbody"
            style={{
                backgroundColor: "#F9F9F9",
                fontFamily: "'Segoe UI', sans-serif",
                paddingTop: "60px",
                paddingBottom: "60px"
            }}
        >
            <div className="container" style={{ maxWidth: "1100px" }}>
                {/* Title */}
                <h2
                    className="fw-semibold text-center"
                    style={{
                        fontSize: "2.2rem",
                        color: "#2E7D32",
                        marginBottom: "10px"
                    }}
                >
                    About Us
                </h2>
                <div
                    style={{
                        height: "4px",
                        width: "60px",
                        backgroundColor: "#2E7D32",
                        margin: "0 auto 40px auto",
                        borderRadius: "2px"
                    }}
                ></div>

                {/* Content Row */}
                <div
                    className="row align-items-center"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px"
                    }}
                >
                    {/* Image */}
                    <div className="col-md-6 image-square" style={{ flex: "1" }}>
                        <img
                            src="/images/about.jpg"
                            alt="About DÉSÍRE Specialist Hospital"
                            className="img-fluid rounded shadow-sm"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "12px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                            }}
                        />
                    </div>

                    {/* Text */}
                    <div
                        className="col-md-6"
                        style={{
                            flex: "1",
                            color: "#555"
                        }}
                    >
                        <p
                            className="lead"
                            style={{
                                fontSize: "1.15rem",
                                fontWeight: "500",
                                marginBottom: "15px",
                                lineHeight: "1.6"
                            }}
                        >
                            <strong>DÉSÍRE Specialist Hospital</strong> is a
                            multi-specialty healthcare facility committed to
                            delivering exceptional medical care with compassion,
                            precision, and professionalism.
                        </p>
                        <p
                            style={{
                                fontSize: "1rem",
                                color: "#757575",
                                marginBottom: "20px",
                                lineHeight: "1.7"
                            }}
                        >
                            Since our founding, we have built a reputation for
                            excellence in medical services, offering everything
                            from routine check-ups to advanced surgical
                            procedures. Our modern facilities are equipped with
                            cutting-edge technology, enabling our healthcare
                            professionals to diagnose and treat with the highest
                            level of accuracy.
                        </p>
                        <p
                            style={{
                                fontSize: "1rem",
                                color: "#757575",
                                marginBottom: "20px",
                                lineHeight: "1.7"
                            }}
                        >
                            We believe that healthcare goes beyond medical
                            treatment—it is about building trust, ensuring
                            comfort, and creating a positive experience for every
                            patient. Whether it’s emergency care, maternity
                            services, specialized surgery, or chronic disease
                            management, our approach is patient-first at every
                            step.
                        </p>
                        <p
                            style={{
                                fontSize: "1rem",
                                color: "#757575",
                                marginBottom: "30px",
                                lineHeight: "1.7"
                            }}
                        >
                            Our commitment extends to the community we serve,
                            providing health education programs, preventive
                            screenings, and outreach initiatives to promote
                            wellness and early detection of illnesses. At DÉSÍRE
                            Specialist Hospital, your health and well-being are
                            our top priorities.
                        </p>

                        <a
                            href="/Services"
                            style={{
                                display: "inline-block",
                                backgroundColor: "#2E7D32",
                                color: "#fff",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                fontWeight: "500",
                                textDecoration: "none",
                                transition: "background-color 0.3s ease"
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.backgroundColor = "#256428")
                            }
                            onMouseOut={(e) =>
                                (e.target.style.backgroundColor = "#2E7D32")
                            }
                        >
                            View Our Services
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
