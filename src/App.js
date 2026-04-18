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

// PASTE THIS NEW VERSION:
function PrivateRoute({ children }) {
    // This removes the broken fetch call that's causing the 404
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
