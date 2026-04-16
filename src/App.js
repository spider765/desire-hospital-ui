import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./essentials/Header";
import Footer from "./essentials/Footer";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact_us";
import Doctors from "./components/Doctors";
import Book from "./components/Book_appointment";
import About from "./components/About";
import Servicesform from "./components/Servicesform";
import Doctorsform from "./components/Doctorsform";

// Admin components
import AdminLogin from "./pages/adminlogin";
import AdminPanel from "./pages/AdminDashboard";

// Private route for admin
function PrivateRoute({ children }) {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        fetch("https://desire-specialist-hospital.onrender.com/admin/me", { credentials: "include" })
            .then(res => res.json())
            .then(data => setIsAdmin(data.logged_in))
            .catch(() => setIsAdmin(false));
    }, []);

    if (isAdmin === null) return <p>Loading...</p>;
    if (!isAdmin) return <Navigate to="/admin-login" replace />;

    return children;
}

function App() {
    return (
        <Router>
            <Header />
            <div className="background">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/servicesform" element={<Servicesform />} />
                    <Route path="/doctorsform" element={<Doctorsform />} />

                    {/* Admin routes */}
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                        path="/Destinysec190"
                        element={
                            <PrivateRoute>
                                <AdminPanel />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
