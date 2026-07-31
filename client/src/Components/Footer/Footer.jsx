import React, { useContext } from 'react';
import { Link } from 'react-router';
import eventEraLogo from '../../assets/EVENTERA LOGO.jpeg';
import { AuthContext } from '../../Providers/AuthProvider';

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
);

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const MapPinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
);

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.13 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
);

const Footer = () => {
    const year = new Date().getFullYear();
    const { user } = useContext(AuthContext);

    const socialLinks = [
        { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
        { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
        { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
        { icon: <TwitterIcon />, label: 'Twitter / X', href: '#' },
        { icon: <WhatsAppIcon />, label: 'WhatsApp', href: '#' },
    ];

    const quickLinks = [
        { to: '/', label: 'Home' },
        { to: '/events', label: 'All Events' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
    ];

    const studentLinks = [
        ...(!user ? [
            { to: '/register', label: 'Create Account' },
            { to: '/login', label: 'Sign In' },
        ] : []),
        { to: '/dashboard', label: 'My Dashboard' },
        { to: '/events', label: 'Browse Events' },
    ];

    return (
        <footer className="footer-root">

            <div className="footer-wave">
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="var(--bg-primary)" />
                </svg>
            </div>

            <div className="footer-body">
                <div className="section-container">

                    <div className="footer-grid">

                        <div className="footer-brand-col">
                            <Link to="/" className="footer-logo">
                                <img
                                    src={eventEraLogo}
                                    alt="IIUC EventEra Logo"
                                    style={{
                                        width: 38, height: 38,
                                        borderRadius: '10px',
                                        objectFit: 'cover',
                                        boxShadow: '0 4px 14px rgba(255,190,145,0.40)',
                                        flexShrink: 0,
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>IIUC</span>
                                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.85rem', background: 'linear-gradient(90deg, #FFBE91, #FFDDB0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.01em' }}>EventEra</span>
                                </div>
                            </Link>
                            <p className="footer-tagline">
                                Your university's official event management portal — where campus life comes alive.
                            </p>

                            <div className="footer-newsletter">
                                <p className="footer-newsletter-label">Stay updated</p>
                                <div className="footer-newsletter-row">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="footer-newsletter-input"
                                        aria-label="Subscribe email"
                                    />
                                    <button className="footer-newsletter-btn" aria-label="Subscribe">
                                        Subscribe
                                    </button>
                                </div>
                            </div>

                            <div className="footer-social-row">
                                {socialLinks.map(({ icon, label, href }) => (
                                    <a key={label} href={href} aria-label={label} className="footer-social-icon">
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="footer-links-col">
                            <h6 className="footer-col-heading">Quick Links</h6>
                            <ul className="footer-link-list">
                                {quickLinks.map(({ to, label }) => (
                                    <li key={to}>
                                        <Link to={to} className="footer-link">
                                            <span className="footer-link-arrow">›</span>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-col">
                            <h6 className="footer-col-heading">For Students</h6>
                            <ul className="footer-link-list">
                                {studentLinks.map(({ to, label }) => (
                                    <li key={to}>
                                        <Link to={to} className="footer-link">
                                            <span className="footer-link-arrow">›</span>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-col">
                            <h6 className="footer-col-heading">Get In Touch</h6>
                            <ul className="footer-contact-list">
                                <li className="footer-contact-item">
                                    <span className="footer-contact-icon"><MapPinIcon /></span>
                                    <span>International Islamic University Chittagong, Bangladesh</span>
                                </li>
                                <li className="footer-contact-item">
                                    <span className="footer-contact-icon"><MailIcon /></span>
                                    <a href="mailto:c241143@ugrad.iiuc.ac.bd" className="footer-contact-link">
                                        c241143@ugrad.iiuc.ac.bd
                                    </a>
                                </li>
                                <li className="footer-contact-item">
                                    <span className="footer-contact-icon"><PhoneIcon /></span>
                                    <a href="tel:+8801887789984" className="footer-contact-link">
                                        +880 1887 789 984
                                    </a>
                                </li>
                            </ul>

                            <div className="footer-office-badge">
                                <span className="footer-office-dot" />
                                <span>Office Hours: Sat – Thu, 11 AM – 3 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom-divider" />
                    <div className="footer-bottom">
                        <span>© {year} <strong>IIUC EventEra</strong> · IIUC · All rights reserved.</span>
                        <div className="footer-bottom-links">
                            <a href="#" className="footer-bottom-link">Privacy Policy</a>
                            <span className="footer-bottom-sep">·</span>
                            <a href="#" className="footer-bottom-link">Terms of Use</a>
                            <span className="footer-bottom-sep">·</span>
                            <a href="#" className="footer-bottom-link">Accessibility</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
